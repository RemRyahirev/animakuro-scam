import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID, Max, Min } from 'class-validator';

@ArgsType()
export class UpdateRyetingAnimeInputType {
    @IsUUID(4)
    @Field(() => ID)
    id: string;

    @IsString()
    @Field(() => String)
    reyting: string;
}
