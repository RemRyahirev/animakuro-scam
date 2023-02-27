import { Module } from '@nestjs/common';

import { TranslationMutationResolver } from './resolvers/translation-mutation.resolver';
import { TranslationService } from './services/translation.service';
import { TranslationRootResolver } from './resolvers/translation-root.resolver';
import { TranslationQueryResolver } from './resolvers/translation-query.resolver';

@Module({
    imports: [],
    providers: [
        TranslationService,
        TranslationRootResolver,
        TranslationQueryResolver,
        TranslationMutationResolver,
    ],
    exports: [],
})
export class TranslationModule {}
