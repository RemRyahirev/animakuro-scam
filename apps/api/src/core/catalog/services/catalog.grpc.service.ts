import { lastValueFrom } from 'rxjs';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { DocumentService } from '@app/common/grpc';

import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { CatalogIndices } from '../models/enums/catalog-indices.enum';

@Injectable()
export class CatalogGrpcService implements OnModuleInit {
    constructor(@Inject('DOCUMENT_PACKAGE') private client: ClientGrpc) {}

    private documentService: DocumentService;

    onModuleInit() {
        this.documentService =
            this.client.getService<DocumentService>('DocumentService');
    }

    async searchDocument(search: string | undefined, index: CatalogIndices) {
        let elasticResults: ElasticResults = {
            results: [],
            done: false,
        };

        if (search && search.length >= 3) {
            const { results } = await lastValueFrom(
                this.documentService.searchDocument({ search, index }),
            );

            elasticResults = {
                results: results ? results : [],
                done: true,
            };
        }

        return elasticResults;
    }
}
