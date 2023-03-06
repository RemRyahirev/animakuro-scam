import { ArgsType, Field, ID } from '@nestjs/graphql';

import { AnimeStillsSortField, SortOrder } from '@app/common/models/enums';

@ArgsType()
export class GetStillsByAnimeIdArgsType {
    /**
     * Parent anime's id
     */
    @Field(() => ID)
    anime_id: string;

    /**
     * Sort by field
     */
    @Field({ defaultValue: AnimeStillsSortField.PRIORITY })
    sort_field?: AnimeStillsSortField;

    /**
     * Sort order
     */
    @Field({ defaultValue: SortOrder.ASC })
    sort_order?: SortOrder;
}
