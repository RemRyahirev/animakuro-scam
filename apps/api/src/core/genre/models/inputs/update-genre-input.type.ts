import { IsOptional, IsString, IsUUID, Length } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateGenreInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsString()
    @Length(1, 50)
    @Field(() => String, { nullable: true })
    name?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    description?: string | null;
}
