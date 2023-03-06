import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Length } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserFolderArgsType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 25)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => [ID])
    animes_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => [ID])
    animes_remove?: string[];

    @IsOptional()
    is_statistic_active?: boolean;
}
