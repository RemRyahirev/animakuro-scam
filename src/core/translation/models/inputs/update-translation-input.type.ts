import { ArgsType, Field, ID } from 'type-graphql';
import { IsString, Length } from 'class-validator';

@ArgsType()
export class UpdateTranslationInputType {
    @Field(() => ID)
    id: string;

    @IsString()
    @Length(1, 20)
    @Field(() => String)
    language: string;

    @IsString()
    @Field(() => String)
    translation: string;
}
