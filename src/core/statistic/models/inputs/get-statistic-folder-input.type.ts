import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsNumber, IsOptional, IsUUID } from 'class-validator';
@ArgsType()
export class GetStatisticFolderInputType {
    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => String, { nullable: true })
    id?: string;

    @IsOptional()
    @IsNumber()
    @Field(() => Int, { nullable: true })
    max_count?: number;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { nullable: true })
    user_folders_id?: string[];
}
