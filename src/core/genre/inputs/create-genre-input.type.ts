import { ArgsType, Field } from 'type-graphql';
import { IsString, Length } from 'class-validator';

@ArgsType()
export class CreateGenreInputType {
    @IsString()
    @Length(1, 50)
    @Field(() => String)
    genre_name: string;
}
