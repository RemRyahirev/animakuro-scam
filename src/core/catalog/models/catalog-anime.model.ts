import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { MediaFormat } from '../../../common/models/enums';

@ObjectType()
export class CatalogAnime {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => Int)
    year: number;

    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    format: string;

    @Field(() => Int)
    episodes: number;

    @Field(() => String)
    preview_link: string;
}
