import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";


const entitySelect = {
    anime: {
        id: true,
        title: true,
        score: true,
        format: true,
        episodes: true,
        rating: true,
        //is_favourite
        cover: {
            select: {
                url: true
            }
        },
        date_start: true   
    },
    character: {
        id: true,
        name: true,
        cover: true,
        // is_favourite
    },
    studio: {
        id: true,
        name: true,
        rating: true,
        thumbnail: {
            select: {
                url: true
            }
        },
        anime_count: true,
        // is_favourite
    },
    author: {
        id: true,
        name: true,
        cover: {
            select: {
                url: true
            }
        }
        // is_favourite
    }
}
const EntityKeywords = ['anime', 'studio', 'author', 'character'];
const AttrParams = ['columns', 'size', 'shape'];

// type TParsedAttrs = Array<{entity: typeof EntityKeywords[number]; id_list: string[]; args: keyof typeof AttrParams}>;

@Injectable()
export class MarkdownService {
    private REGEX = new RegExp(`<(${EntityKeywords.join('|')}):(([a-f\\d-]{36},?)+)((\\s+(\\w+)=(\\w+))*)>`, 'ig');



    constructor(
        private readonly prisma: PrismaService
    ) {}

    public parseAttrs(markdown: string) {
        const regex = new RegExp(`<(${EntityKeywords.join('|')}):(([a-f\\d-]{36},?)+)((\\s+(${AttrParams.join('|')})=(\\w+))*)>`, 'ig');
        const tags = markdown.matchAll(regex);
        const arrayTags = [...tags];

        const parsedcollectionData = []
        for (let i = 0; i < arrayTags.length; i++) {
            const entity: typeof EntityKeywords[number] = arrayTags[i][1];
            const id_list = arrayTags[i][2].split(',');
            const args = arrayTags[i][4].trim().split(' ')
                .reduce((prev, current) => {
                    const [key, value] = current.split('=');
                    return key ?
                        {...prev, [key]: value} :
                        prev;       
                }, {});

            parsedcollectionData.push({
                entity: entity,
                id_list: id_list,
                args: args
            })
        }
        return parsedcollectionData;
    }

    public async receivingData(parsedcollectionData: any): Promise<any> {
        const promisesCollectionData = []
        for (let i = 0; i < parsedcollectionData.length; i++) {
            const entity = parsedcollectionData[i].entity;
            // @ts-ignore
            const primiseCollectionDataItem = this.prisma[entity].findMany({
                where: {
                    id: {
                        in: parsedcollectionData[i].id_list
                    }
                },
                // @ts-ignore
                select: entitySelect[entity]
            });
            promisesCollectionData.push(primiseCollectionDataItem)
        }

        return await Promise.all(promisesCollectionData);
    }

    public async normalizeData(parsedData: any, receivedData: any) {
        const completeData = [];
        for (let i = 0; i < parsedData.length; i++) {
            const entity = parsedData[i].entity;
            const args = parsedData[i].args;
            const data = receivedData[i];
            completeData.push({entity, args, data});
        }

        return completeData;
    }

    public async getParsed(markdown?: string | null) {
        if (!markdown) return null;

        const parsedData = this.parseAttrs(markdown);
        
        const receivedData = await this.receivingData(parsedData);  

        const normalizedData = this.normalizeData(parsedData, receivedData);

        // console.log('normal', normalizedData);

        return normalizedData;
    }
}