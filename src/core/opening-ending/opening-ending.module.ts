import { OpeningEndingRootResolver } from "./resolvers/opening-ending-root.resolver";
import { Module } from "@nestjs/common";
import { OpeningEndingQueryResolver } from "./resolvers/opening-ending-query.resolver";
import { OpeningEndingService } from "./services/opening-ending.service";
import { OpeningEndingMutationResolver } from "./resolvers/opening-ending-mutation.resolver";
import { OpeningEndingTransformerService } from "./services/opening-ending-transformer.service";



@Module({
    imports: [],
    providers: [
        OpeningEndingRootResolver,
        OpeningEndingQueryResolver,
        OpeningEndingMutationResolver,
        OpeningEndingService,
        OpeningEndingTransformerService
    ],
    exports: []
})
export class OpeningEndingModule {}