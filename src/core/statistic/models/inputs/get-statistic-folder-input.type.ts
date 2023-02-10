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
    take?: number;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { nullable: true })
    userFoldersId?: string[];
}
