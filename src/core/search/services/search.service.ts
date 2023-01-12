import { GetListSearchAnimeResultsType } from '../models/results/get-list-search-anime-results.type';
import { SearchAnimeInputType } from '../models/inputs/search-anime-input.type';
import { Prisma } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { PrismaService } from '../../../common/services/prisma.service';
import { PaginationService } from '../../../common/services/pagination.service';
import { DocumentService, grpcClientConfig } from '../../../common/grpc';

@Injectable()
export class SearchService implements OnModuleInit {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    @Client(grpcClientConfig)
    private client: ClientGrpc;
    private documentService: DocumentService; // Names need to be changed

    onModuleInit() {
        this.documentService =
            this.client.getService<DocumentService>('DocumentService');
    }

    async getSearchAnimeList(
        args: SearchAnimeInputType,
    ): Promise<GetListSearchAnimeResultsType> {
        // So far without filter, sorting and pagination
        // const prismaOptions: Prisma.AnimeFindManyArgs = {};

        const elasticResults = this.documentService.searchDocument(
            'anime',
            'something',
        )

        console.log(elasticResults)

        const animeList = await this.prisma.anime.findMany({
            where: {
                id: {
                    in: [],
                },
                // ...args.filter,
            },
            select: {
                id: true,
                title: true,
                year: true,
                format: true,
                episodes: true,
                preview_link: true,
            },
        });

        return {
            success: true,
            errors: [],
            animeList: animeList as any,
        };
    }
}
