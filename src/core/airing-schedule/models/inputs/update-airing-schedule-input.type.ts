import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import {
    IsDate,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';

@ArgsType()
export class UpdateAiringScheduleInputType {
    @IsUUID()
    @Field(() => ID, {
        description: `The airing schedule's ID`,
    })
    id: string;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        description: 'The official airing date of the media',
        nullable: true,
    })
    airing_at?: Date;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @Field(() => String, {
        description: 'The name of the airing episode',
        nullable: true,
    })
    name?: string;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        description: 'The airing episode number',
        nullable: true,
    })
    episode?: number;
}
