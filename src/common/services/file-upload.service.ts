import { FileUpload } from 'graphql-upload';
import { default as CdnClient, FormData } from '@animakuro/animakuro-cdn';
import {  Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { BUCKET_CONFIG } from 'common/config/cdn';
import CustomError from 'common/utils/custom.error';
import { PrismaService } from './prisma.service';

type UploadResultOne = Promise<{ connect: { id: string; }; } | undefined>;
type UploadResultMany = Promise<{ connect: Array<{ id: string; }>; } | undefined>;
type DeleteResult = Promise<null | undefined>;

type PrismaModelKeys = Exclude<keyof PrismaClient,
    | '$on'
    | '$connect'
    | '$disconnect'
    | '$use'
    | '$executeRaw'
    | '$executeRawUnsafe'
    | '$queryRaw'
    | '$queryRawUnsafe'
    | '$transaction'
    | '$extends'
>;
type PrismaModels = keyof Prisma.TypeMap['model'];
type Model2EntityMap = { [K in PrismaModels]: Uncapitalize<K>; };
type EntitiesMap = { [K in keyof Model2EntityMap as Model2EntityMap[K]]: K; };
type PrismaModelMethod = 'findUniqueOrThrow';
type ModelFields<T extends PrismaModels> = Required<Prisma.TypeMap['model'][T][PrismaModelMethod]['result']>;
type ModelUnique<T extends PrismaModels> = Prisma.TypeMap['model'][T][PrismaModelMethod]['args']['where'];

export type FileStorageForOne<E extends PrismaModelKeys> = {
    tryCreate: (file?: Promise<FileUpload>, user_id?: string) => UploadResultOne,
    tryDelete: (fileId?: string) => DeleteResult,
    tryDeleteAll: (uniqueWhere: ModelUnique<EntitiesMap[E]>) => Promise<void>,
    tryUpdate: (
        uniqueWhere: ModelUnique<EntitiesMap[E]>,
        addFile?: Promise<FileUpload>,
        removeId?: string,
        user_id?: string,
    ) => UploadResultOne,
};
export type FileStorageForMany<E extends PrismaModelKeys> = {
    tryCreate: (files?: Promise<FileUpload>[], user_id?: string) => UploadResultMany,
    tryDelete: (fileIds?: string[]) => DeleteResult,
    tryDeleteAll: (uniqueWhere: ModelUnique<EntitiesMap[E]>) => Promise<void>,
    tryUpdate: (
        uniqueWhere: ModelUnique<EntitiesMap[E]>,
        addFiles?: Promise<FileUpload>[],
        removeIds?: string[],
        user_id?: string,
    ) => UploadResultMany,
};

type BucketNames = keyof typeof BUCKET_CONFIG;

@Injectable()
export class FileUploadService {
    private cdnClient;
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {
        const url = this.configService.getOrThrow<string>('CDN_URL');
        const buckets = this.configService.getOrThrow<string>('CDN_BUCKET');
        this.cdnClient = new CdnClient(url, buckets);
    }

    protected getFileStream(file: FileUpload, bucket: BucketNames) {
        let maxSize = BUCKET_CONFIG[bucket].maxFileSize;

        const stream = file.createReadStream();
        if (!maxSize || maxSize < 0) {
            return stream;
        }

        maxSize *= 1024; // KB -> B
        let size = 0;
        stream.on('data', (data: Buffer) => {
            size += data.byteLength;

            if (size > maxSize) {
                // XXX: this error is caught by axios inside cdn lib
                //      however we can patch this error to pass details in response
                const err = new Error();
                // @ts-ignore
                err.response = {
                    data: {
                        message: 'Uploading file exceeded size limit',
                        size: maxSize,
                        file: file.filename,
                        description: `"${file.filename}" size is greater than ${Math.round(maxSize / 1024)}KB`,
                    },
                };

                stream.destroy(
                    err,
                );
            }
        });

        return stream;
    }

    async tryUploadOne(
        bucket: BucketNames,
        file?: Promise<FileUpload>,
        user_id?: string,
    ): UploadResultOne {
        if (!file || !user_id) {
            return undefined;
        }

        return {
            connect: {
                id: (await this.upload(bucket, [await file], user_id))[0],
            },
        };
    }

    async tryUploadMany(
        bucket: BucketNames,
        files?: Promise<FileUpload>[],
        user_id?: string,
    ): UploadResultMany {
        if (!files?.length || !user_id) {
            return undefined;
        }

        return {
            connect: (await this.upload(bucket, await Promise.all(files), user_id))
                .map((e, i) => ({
                    id: e,
                })),
        };
    }

    protected async upload(
        bucket: BucketNames,
        files: FileUpload[],
        user_id: string,
    ): Promise<string[]> {
        const bucketConfig = BUCKET_CONFIG[bucket];
        if (!bucketConfig) {
            throw new CustomError('Bad bucket name', { bucket });
        }

        const formData = new FormData();
        files.forEach(file => {
            formData.append(
                file.filename,
                this.getFileStream(file, bucket),
                {
                    contentType: file.mimetype,
                    filename: file.filename,
                });
        });

        const response = await this.cdnClient.uploadFilesFromFormData(formData, BUCKET_CONFIG[bucket].bucket);

        if (!response?.ids?.length || !response?.urls?.length) {
            throw new CustomError('CDN upload error', { response });
        }

        const ids = response.ids.map(async (file_id, i) => {
            const url = response.urls[i];

            try {
                const data = await this.prisma.file.create({
                    data: {
                        file_id,
                        bucket_name: BUCKET_CONFIG[bucket].bucket,
                        url,
                        user_id,
                    },
                });

                return data.id;
            } catch (err) {
                throw new CustomError('DB creation error', { message: (err as Error).message })
            }
        });

        return await Promise.all(ids);

        return [];
    }

    async tryDeleteOne(
        bucket: BucketNames,
        fileId?: string,
    ) {
        if (!fileId) {
            return undefined;
        }

        await this.delete(bucket, [fileId]);

        return null;
    }

    async tryDeleteMany(
        bucket: BucketNames,
        fileIds?: string[],
    ) {
        if (!fileIds?.length) {
            return undefined;
        }

        await this.delete(bucket, fileIds);

        return null;
    }

    protected async delete(
        bucket: BucketNames,
        fileIds: string[],
    ) {
        const bucketConfig = BUCKET_CONFIG[bucket];
        if (!bucketConfig) {
            throw new CustomError('Bad bucket name', { bucket });
        }

        const cdnFileIds = await this.prisma.file.findMany({ where: { id: { in: fileIds } }, select: { id: true, file_id: true } })

        const errors: Record<string, string> = {};
        const requests = cdnFileIds.map(async ({ id, file_id }) => {
            const cdnResponse = await this.cdnClient.deleteFileById(file_id, BUCKET_CONFIG[bucket].bucket);

            if (!cdnResponse?.success) {
                errors[id] = '[CDN] ' + (cdnResponse?.message ? String(cdnResponse.message) : 'Unknown error');
                return;
            }

            let deleted: { id: string };
            try {
                deleted = await this.prisma.file.delete({ where: { id }, select: { id: true } });
            } catch (err) {
                if (err instanceof PrismaClientKnownRequestError && err.code === 'RecordNotFound') {
                    // there is no error just strange
                    return;
                }

                errors[id] = '[DB] ' + (err as Error).message;
                return;
            }

            if (!deleted?.id) {
                errors[id] = '[DB] Unknown error';
            }
        });

        await Promise.all(requests);

        const errorsCount = Object.keys(errors).length;
        if (errorsCount) {
            throw new CustomError(
                errorsCount === fileIds.length
                    ? 'Deletion error'
                    : 'Deletion partially failed',
                errors,
            );
        }
    }

    protected async getExistingIds<E extends PrismaModelKeys, M extends PrismaModels = EntitiesMap[E]>(
        entity: E,
        uniqueWhere: any,
        fileField: any,
        // XXX: TS crashes with max call stack exceeded if we'll use precise types
        // uniqueWhere: Prisma.TypeMap['model'][M][PrismaModelMethod]['args']['where'],
        // fileField: keyof ModelFields<M>,
    ): Promise<string[]> {
        // XXX: little hack to fix completion
        // (using 'studio' as example, otherwise ts don't know that
        // findUnique has just the same signature in our case)
        // const model = this.prisma[entity] as PrismaClient['studio'];
        // backward type transition
        // const commonEntry = entry as unknown as ModelFields<EntitiesMap[E]> | null;

        // @ts-ignore
        const entry = await this.prisma[entity].findUnique({ where: uniqueWhere, select: { [fileField]: true } });

        const value = entry?.[fileField] as string | string[] | null;

        if (!value) {
            return [];
        }

        return Array.isArray(value) ? value : [value];
    }

    async tryDeleteAll<E extends PrismaModelKeys>(
        entity: E,
        uniqueWhere: any,
        fileField: any,
        // XXX: TS crashes with max call stack exceeded if we'll use precise types
        // uniqueWhere: ModelUnique<EntitiesMap[E]>,
        // fileField: keyof ModelFields<EntitiesMap[E]>,
        bucket: BucketNames,
    ) {
        const existingIds: string[] = await this.getExistingIds(entity, uniqueWhere, fileField);
        if (existingIds?.length) {
            await this.delete(bucket, existingIds);
        }
    }

    async tryUpdateOne<E extends PrismaModelKeys>(
        entity: E,
        uniqueWhere: any,
        fileField: any,
        // XXX: TS crashes with max call stack exceeded if we'll use precise types
        // uniqueWhere: ModelUnique<EntitiesMap[E]>,
        // fileField: keyof ModelFields<EntitiesMap[E]>,
        bucket: BucketNames,
        addFile?: Promise<FileUpload>,
        removeId?: string,
        user_id?: string,
        maxCount = 0,
    ): UploadResultOne {
        const ids: string[] = await this.update(
            entity,
            uniqueWhere,
            fileField,
            bucket,
            addFile ? [await addFile] : undefined,
            removeId ? [removeId] : undefined,
            user_id,
            maxCount,
        );

        return {
            connect: {
                id: ids[0],
            },
        };
    }

    async tryUpdateMany<E extends PrismaModelKeys>(
        entity: E,
        uniqueWhere: any,
        fileField: any,
        // XXX: TS crashes with max call stack exceeded if we'll use precise types
        // uniqueWhere: ModelUnique<EntitiesMap[E]>,
        // fileField: keyof ModelFields<EntitiesMap[E]>,
        bucket: BucketNames,
        addFiles?: Promise<FileUpload>[],
        removeIds?: string[],
        user_id?: string,
        maxCount = 0,
    ): UploadResultMany {
        const ids: string[] = await this.update(
            entity,
            uniqueWhere,
            fileField,
            bucket,
            addFiles?.length ? await Promise.all(addFiles) : undefined,
            removeIds,
            user_id,
            maxCount,
        );

        return {
            connect: ids.map(id => ({id})),
        };
    }

    protected async update<E extends PrismaModelKeys>(
        entity: E,
        uniqueWhere: any,
        fileField: any,
        // XXX: TS crashes with max call stack exceeded if we'll use precise types
        // uniqueWhere: ModelUnique<EntitiesMap[E]>,
        // fileField: keyof ModelFields<EntitiesMap[E]>,
        bucket: BucketNames,
        addFiles?: FileUpload[],
        removeIds?: string[],
        user_id?: string,
        maxCount = 0,
    ): Promise<string[]> {
        if (maxCount === 1) {
            // Plan:
            //   - if it has removeIds then remove it
            //   - if no removeIds get existingIds and remove it
            //   - then add
            if (removeIds?.length) {
                await this.delete(bucket, removeIds);
            } else {
                const existingIds: string[] = await this.getExistingIds(entity, uniqueWhere, fileField);
                if (existingIds?.length) {
                    await this.delete(bucket, existingIds);
                }
            }

            if (!addFiles?.length || !user_id) {
                return [];
            }

            return await this.upload(bucket, addFiles, user_id);
        }

        if (maxCount > 1) {
            // Plan:
            //   - get existingIds
            //   - existingIds minus removeIds = stayIds
            //   - (stayIds plus addIds).len <= maxCount check
            //   - remove first then add
            const existingIds: string[] = await this.getExistingIds(entity, uniqueWhere, fileField);
            const shouldStayIds = removeIds?.length
                ? existingIds.filter(id => !removeIds.includes(id))
                : existingIds;
            const shouldBeLength = shouldStayIds.length + (addFiles?.length ?? 0);

            if (shouldBeLength > maxCount) {
                throw new CustomError('Requested amount of files exceeded the limit', {
                    requested: shouldBeLength,
                    limit: maxCount,
                });
            }

            if (removeIds?.length) {
                await this.delete(bucket, removeIds);
            }

            if (!addFiles?.length || !user_id) {
                return shouldStayIds;
            }

            const newIds = await this.upload(bucket, addFiles, user_id);

            return shouldStayIds.concat(newIds);
        }

        // Plan:
        //   - add then remove
        //   - get existing
        if (addFiles?.length && user_id) {
            await this.upload(bucket, addFiles, user_id);
        }

        if (removeIds?.length) {
            await this.delete(bucket, removeIds);
        }

        return await this.getExistingIds(entity, uniqueWhere, fileField);
    }

    // XXX: these two methods are nly where we'll use precise types
    //      otherwise TS crashes with max call stack exceeded
    //      However these methods are public interface to use this service, so it's ok
    getStorageForOne<E extends PrismaModelKeys>(
        entity: E,
        fileField: keyof ModelFields<EntitiesMap[E]>,
        bucket: BucketNames,
    ): FileStorageForOne<E> {
        return {
            tryCreate: (file?: Promise<FileUpload>, user_id?: string) => this.tryUploadOne(bucket, file, user_id),
            tryDelete: (fileId?: string) => this.tryDeleteOne(bucket, fileId),
            tryDeleteAll: (uniqueWhere: ModelUnique<EntitiesMap[E]>) => this.tryDeleteAll(entity, uniqueWhere, fileField, bucket),
            tryUpdate: async (
                uniqueWhere: ModelUnique<EntitiesMap[E]>,
                addFile?: Promise<FileUpload>,
                removeId?: string,
                user_id?: string,
            ) => await this.tryUpdateOne(
                entity,
                uniqueWhere,
                fileField,
                bucket,
                addFile,
                removeId,
                user_id,
                1,
            ),
        };
    }

    getStorageForMany<E extends PrismaModelKeys>(
        entity: E,
        fileField: keyof ModelFields<EntitiesMap[E]>,
        bucket: BucketNames,
        maxCount = 0,
    ): FileStorageForMany<E> {
        return {
            tryCreate: (files?: Promise<FileUpload>[], user_id?: string) => this.tryUploadMany(bucket, files, user_id),
            tryDelete: (fileIds?: string[]) => this.tryDeleteMany(bucket, fileIds),
            tryDeleteAll: (uniqueWhere: ModelUnique<EntitiesMap[E]>) => this.tryDeleteAll(entity, uniqueWhere, fileField, bucket),
            tryUpdate: async (
                uniqueWhere: ModelUnique<EntitiesMap[E]>,
                addFiles?: Promise<FileUpload>[],
                removeIds?: string[],
                user_id?: string,
            ) => this.tryUpdateMany(
                entity,
                uniqueWhere,
                fileField,
                bucket,
                addFiles,
                removeIds,
                user_id,
                maxCount,
            ),
        };
    }
}
