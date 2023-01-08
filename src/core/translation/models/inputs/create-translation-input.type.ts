import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length } from '@nestjs/class-validator';

@ArgsType()
export class CreateTranslationInputType {
    @IsString()
    @Length(1, 20)
    @Field(() => String)
    language: string;

    @IsString()
    @Field(() => String)
    translation: string;
}
