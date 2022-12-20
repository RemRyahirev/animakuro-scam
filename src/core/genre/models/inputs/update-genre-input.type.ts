import { ArgsType, Field, ID } from 'type-graphql';
import { IsString, IsUUID, Length } from "class-validator";

@ArgsType()
export class UpdateGenreInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsString()
    @Length(1, 50)
    @Field(() => String)
    genre_name: string;
}
