import { Field, ID, ObjectType, Int, InputType } from '@nestjs/graphql';

import {
    AnimeStillsType,
    AnimeStillsSortField,
} from '@app/common/models/enums';
import { File } from '@app/common/models/results/file.model';

import { Anime } from './anime.model';

@ObjectType()
export class Stills {
    /**
     * ID of anime still
     */
    @Field(() => ID)
    id: string;

    /**
     * ID of anime
     */
    @Field(() => ID)
    anime_id: string;

    /**
     * ID of source
     */
    @Field(() => ID)
    frame_id?: string;

    /**
     * Foreign of source
     */
    url?: string;

    /**
     * Data type of current still
     */
    @Field(() => AnimeStillsType)
    type: AnimeStillsType;

    /**
     * Priority of stills 1, 2, 3 etc...
     */
    @Field(() => Int)
    priority?: number;

    /**
     * Created at Date
     */
    created_at: Date;

    /**
     * Updated at Date
     */
    updated_at: Date;

    /**
     * File's metadata
     */
    frame?: File;

    /**
     * Parrent anime
     */
    anime: Anime;
}

@InputType()
export class UploadStillsInputType {
    /**
     * Index to Upload file in array
     */
    @Field(() => Int)
    still_index?: number;

    /**
     * Youtube id
     */
    url?: string;

    @Field(() => AnimeStillsType)
    type: AnimeStillsType;

    @Field(() => Int)
    priority?: number;
}
