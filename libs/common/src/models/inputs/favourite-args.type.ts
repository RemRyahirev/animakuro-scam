import { IsBoolean } from '@nestjs/class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class FavouriteArgsType {
    @IsBoolean()
    @Field(() => Boolean, { defaultValue: false })
    animes_favourite: boolean;

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: false })
    studios_favourite: boolean;

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: false })
    characters_favourite: boolean;

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: false })
    genres_favourite: boolean;

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: false })
    authors_favourite: boolean;
}
