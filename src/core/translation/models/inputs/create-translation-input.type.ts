import { ArgsType, Field } from 'type-graphql';
import { IsString, Length } from 'class-validator';

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
