import { IsOptional, IsString, Length } from '@nestjs/class-validator';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateGenreArgsType {
    @IsString()
    @Length(1, 50)
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}
