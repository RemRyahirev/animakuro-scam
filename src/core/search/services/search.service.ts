import { GetListSearchAnimeResultsType } from '../models/results/get-list-search-anime-results.type';
import { SearchAnimeInputType } from '../models/inputs/search-anime-input.type';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PrismaService } from '../../../common/services/prisma.service';
import { PaginationService } from '../../../common/services/pagination.service';
import { DocumentService } from '../../../common/grpc';
import { lastValueFrom } from 'rxjs';
import { ElasticResults } from '../models/results/elastic-response.type';
import { createPrismaOptions } from '../utils/create-prisma-options';

@Injectable()
export class SearchService implements OnModuleInit {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        @Inject('DOCUMENT_PACKAGE') private client: ClientGrpc,
    ) {}
    private documentService: DocumentService; // Names need to be changed

    onModuleInit() {
        this.documentService =
            this.client.getService<DocumentService>('DocumentService');
    }

    async getSearchAnimeList(
        args: SearchAnimeInputType,
    ): Promise<GetListSearchAnimeResultsType> {
        const { search, ...filterOptions } = args;
        const elasticResults = (await lastValueFrom(
            this.documentService.searchDocument({
                search: args.search || '',
                index: 'anime',
            }),
        )) as ElasticResults;

        const prismaOptions = createPrismaOptions(
            elasticResults.results.map((r) => r.id),
            filterOptions,
        );

        const animeList = await this.prisma.anime.findMany(prismaOptions);

        return {
            success: true,
            errors: [],
            animeList: animeList as any,
        };
    }
}
