import { IsString, Length } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateTranslationArgsType {
    @IsString()
    @Length(1, 20)
    @Field(() => String)
    language: string;

    @IsString()
    @Field(() => String)
    translation: string;
}
