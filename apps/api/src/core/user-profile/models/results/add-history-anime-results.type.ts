import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "@app/common/models/results";
import { AnimeHistory } from "../../../anime/models/history.model";


@ObjectType()
export class AddHistoryAnimeResultsType extends BaseResultsType {
    @Field(() => AnimeHistory, {
        nullable: true,
        description: 'Created history'
    })
    anime_history?: AnimeHistory | null;
}