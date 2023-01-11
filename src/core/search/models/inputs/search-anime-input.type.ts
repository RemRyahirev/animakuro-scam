import { IsOptional, IsString, Length } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SearchAnimeInputType {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    @Field(() => String, { nullable: true })
    search?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    status?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    season?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    genre?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    studio?: string;
}
