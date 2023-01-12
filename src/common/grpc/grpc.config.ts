import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientConfig: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'document',
        protoPath: join(__dirname, './document.proto')
    },
};
