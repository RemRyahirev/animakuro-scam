import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { credentials } from "@grpc/grpc-js";

export const grpcClientConfig: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'document',
        protoPath: join(__dirname, './document.proto'),
        url: process.env.GRPC_URL,
        loader: { keepCase: true },
        credentials: credentials.createSsl(),
    },
};
