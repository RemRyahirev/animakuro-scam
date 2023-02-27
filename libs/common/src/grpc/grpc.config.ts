import { join } from 'path';
import { credentials } from '@grpc/grpc-js';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientConfig: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'document',
        protoPath: join(__dirname, __dirname.includes('grpc') ? '' : 'grpc/' ,'./document.proto'),
        url: process.env.GRPC_URL,
        loader: { keepCase: true },
        credentials: credentials.createSsl(),
    },
};
