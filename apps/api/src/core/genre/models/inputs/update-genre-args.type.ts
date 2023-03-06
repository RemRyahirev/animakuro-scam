import { IsOptional, IsString, IsUUID, Length } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateGenreArgsType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsString()
    @Length(1, 50)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
