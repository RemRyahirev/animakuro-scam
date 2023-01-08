import { Module } from '@nestjs/common';
import { CharacterService } from './services/character.service';
import { CharacterMutationResolver } from './resolvers/character-mutation.resolver';
import { CharacterRootResolver } from './resolvers/character-root.resolver';
import { CharacterQueryResolver } from './resolvers/character-query.resolver';

@Module({
    imports: [],
    providers: [
        CharacterService,
        CharacterRootResolver,
        CharacterQueryResolver,
        CharacterMutationResolver,
    ],
    exports: [],
})
export class CharacterModule {}
