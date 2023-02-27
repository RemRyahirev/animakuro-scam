import { IsArray, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetStatisticFolderInputType {
    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => String, { nullable: true })
    id?: string;

    @IsOptional()
    @Min(1)
    @IsNumber()
    @Field(() => Int, { nullable: true })
    max_count?: number;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { nullable: true })
    user_folders_id?: string[];
}
