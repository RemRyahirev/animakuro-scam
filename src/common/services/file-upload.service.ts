import { FileUpload } from 'graphql-upload';
import { default as CdnClient, FormData } from '@animakuro/animakuro-cdn';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CustomError from 'common/utils/custom.error';
import { PrismaService } from './prisma.service';

type BucketConfigItem = {
    maxFileSize?: number;
    maxFileCount?: number;
    bucket: string;
    validation?: string;
};

const VALIDATION = {
    image: '.png/.jpg/.gif',
};

const BUCKET_CONFIG = {
    studio: {
        maxFileSize: 1000,
        maxFileCount: 2,
        bucket: 'images1',
        validation: VALIDATION.image,
    },
    animeBanner: {
        maxFileSize: 5000,
        maxFileCount: 1,
        bucket: 'anime_banners',
        validation: VALIDATION.image,
    },
} satisfies Record<string, BucketConfigItem>;
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

    async upload(
        bucket: BucketNames,
        files: FileUpload[],
    ): Promise<string[]> {
        const bucketConfig = BUCKET_CONFIG[bucket];
        if (!bucketConfig) {
            throw new CustomError('Bad bucket name', { bucket });
        }

        const formData = new FormData();
        files.forEach(file => {
            formData.append(
                file.filename,
                file.createReadStream(),
                {
                    contentType: file.mimetype,
                    filename: file.filename,
                });
        });

        const result = await this.cdnClient.uploadFilesFromFormData(formData, BUCKET_CONFIG[bucket].bucket);

        if (!result?.ids?.length || !result?.urls?.length) {
            throw new CustomError('CDN upload error');
        }

        const ids = result.ids.map(async (file_id, i) => {
            const url = result.urls[i];

            const data = await this.prisma.file.create({
                data: {
                    file_id,
                    bucket_name: BUCKET_CONFIG[bucket].bucket,
                    // fixme
                    user_id: '5b594675-a3c6-4e1b-acaa-2e612419b9e2',
                },
            });

            return data.id;
        });

        return await Promise.all(ids);
    }

    // async _upload(files: FileUpload[]) {
    //     const streams = files.map((file) => {
    //         return file.createReadStream();
    //     });
    //     try {
    //         const files = await this.cdnClient.uploadFilesFromStreams(
    //             streams,
    //             'test1',
    //         );
    //         const urls = files?.urls || [];
    //         const ids = files?.ids || [];
    //         Promise.all(
    //             urls.map((url: string, i: number) => {
    //                 const id = ids[i];
    //                 this.uploadDataInToDB({
    //                     uploader: 'uploader',
    //                     file_id: id,
    //                     cdn_bucket: 'test1',
    //                 });
    //             }),
    //         );
    //         return files;
    //     } catch (error: any) {
    //         throw new HttpException(
    //             `Could not save image, ${error.message}`,
    //             HttpStatus.BAD_REQUEST,
    //         );
    //     }
    // }
    // async delete(id: string, bucket_name: string): Promise<any> {
    //     try {
    //         const resp = await this.cdnClient.deleteFileById(id, bucket_name);
    //         if (!resp?.success) {
    //             throw new HttpException(
    //                 `Could not delete image`,
    //                 HttpStatus.BAD_REQUEST,
    //             );
    //         } else {
    //             await this.deleteDataInToDB(id);
    //             return resp;
    //         }
    //     } catch (error: any) {
    //         throw new HttpException(
    //             `Could not delete image, ${error.message}`,
    //             HttpStatus.BAD_REQUEST,
    //         );
    //     }
    // }
    //
    // async uploadDataInToDB(data: any) {
    //     console.log('uploading into db');
    //     return this.prisma.resources.create({ data });
    // }
    //
    // async deleteDataInToDB(file_id: string | undefined) {
    //     console.log('delete from db');
    //     return this.prisma.resources.delete({ where: { file_id } });
    // }
    //
    // async getFiles(cdn_bucket: string) {
    //     console.log('get images from db');
    //     return this.prisma.resources.findMany({
    //         where: {
    //             cdn_bucket,
    //         }
    //     })
    // }
}
