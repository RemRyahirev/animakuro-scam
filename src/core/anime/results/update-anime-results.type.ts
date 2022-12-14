import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from "../../../common/results/base-results.type";
import { Anime } from "../schemas/anime.schema";

@ObjectType()
export class UpdateAnimeResultsType extends BaseResultsType {
    @Field(() => Anime, {
        nullable: true,
        description: 'Anime',
    })
    anime: Anime | null;
}
