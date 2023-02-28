import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "@app/common/models/results";
import { AnimeHistory } from "../../../anime/models/history.model";



@ObjectType()
export class GetHistoryAnimeResultsType extends BaseResultsType {
    @Field(() => [AnimeHistory], {
        nullable: true,
        description: 'Anime history list'
    })
    anime_history_list?: AnimeHistory[];
}