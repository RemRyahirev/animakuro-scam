import { Anime } from '../../../core/anime/models/anime.model';
import { Field, ObjectType } from 'type-graphql';
import { AnimeConnection } from '../enums/anime-connection.enum';

@ObjectType()
export class AnimeConnectionType {
    @Field(() => Anime, {
        nullable: false,
        description: 'Connected anime',
    })
    anime: Anime;

    @Field(() => String || Number || [String], {
        nullable: false,
        description: 'Type of connection',
    })
    anime_connection: AnimeConnection;
}
