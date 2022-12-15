import { ArgsType, Field, ID } from 'type-graphql';
import { IsString, Length } from 'class-validator';

@ArgsType()
export class UpdateGenreInputType {
    @Field(() => ID)
    id: string;

    @IsString()
    @Length(1, 50)
    @Field(() => String)
    genre_name: string;
}
