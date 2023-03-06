import { IsArray, IsOptional, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID, InputType, Int } from '@nestjs/graphql';

import { AnimeStillsType } from '@app/common/models/enums';

@InputType()
class UpdStillsInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @Field(() => Int)
    priority?: number;

    /**
     * Data type of current still
     */
    @IsOptional()
    @Field(() => AnimeStillsType)
    type?: AnimeStillsType;

    @IsOptional()
    url?: string;
}

@ArgsType()
export class UpdateAnimeStillsArgsType {
    @IsArray()
    stills: UpdStillsInputType[];
}
