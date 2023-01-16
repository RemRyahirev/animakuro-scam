import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { DocumentService } from '../../../common/grpc';
import { lastValueFrom } from 'rxjs';
import { ElasticResults } from '../models/interfaces/elastic-response.type';

@Injectable()
export class CatalogGrpcService implements OnModuleInit {
    constructor(@Inject('DOCUMENT_PACKAGE') private client: ClientGrpc) {}

    private documentService: DocumentService;

    onModuleInit() {
        this.documentService =
            this.client.getService<DocumentService>('DocumentService');
    }

    async searchDocument(search: string) {
        return (await lastValueFrom(
            this.documentService.searchDocument({ search, index: 'anime' }),
        )) as ElasticResults;
    }
}
