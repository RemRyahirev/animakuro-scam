import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class Author {
    @Field(() => ID, {
        description: 'Unique ID of the author',
    })
    id?: string;

    @Field(() => Boolean, {
        description: 'Favourite anime',
        defaultValue: false,
    })
    is_favourite?: boolean;

    @Field(() => String, {
        description: 'The names of the author',
    })
    name: string;

    @Field(() => [String], {
        nullable: true,
        description: `The person's primary occupations`,
    })
    primary_occupations: string[];

    @Field(() => Int, {
        nullable: true,
        defaultValue: null,
        description: `The person's age in years`,
    })
    age: number;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
        description: `The author's birth date`,
    })
    date_of_birth: string;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
        description: `The author's death date`,
    })
    date_of_death: string;

    @Field(() => [String], {
        nullable: true,
        description: 'Alternative names of the author',
    })
    synonyms: string[];

    @Field(() => [String], {
        nullable: true,
        description:
            '[startYear, endYear] (If the 2nd value is not present author is still active)',
    })
    years_active: string[];

    @Field(() => String, {
        nullable: true,
        description: 'The author birthplace or hometown',
    })
    home_town: string;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
        description: `The author's blood type`,
    })
    blood_type: string;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
        description: `The primary language of the author`,
    })
    language: string;

    @Field(() => String, {
        nullable: true,
        defaultValue: null,
        description: `The author's gender. Usually Male, Female, or Non-binary.`,
    })
    gender: string;

    @Field(() => String, {
        description: 'Short biography of the author',
    })
    bio: string;

    @Field(() => Date, { description: 'When the author data was created' })
    created_at: Date;

    @Field(() => Date, { description: 'When the author data was last updated' })
    updated_at: Date;

    @Field(() => [Anime], {
        nullable: true,
        description: 'List of the animes in which the character appears',
    })
    animes: Anime[];
}
