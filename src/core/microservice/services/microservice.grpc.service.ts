import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { DocumentService } from '../../../common/grpc';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MicroserviceGrpcService implements OnModuleInit {
    constructor(@Inject('DOCUMENT_PACKAGE') private client: ClientGrpc) {}

    private documentService: DocumentService;

    onModuleInit() {
        this.documentService =
            this.client.getService<DocumentService>('DocumentService');
    }

    async forceUpdateDbELC() {
        await lastValueFrom(this.documentService.forceUpdateDocuments({}));

        return {
            success: true,
            errors: [],
        };
    }
}
