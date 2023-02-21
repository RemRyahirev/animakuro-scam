import { Field, ID, registerEnumType, ObjectType, Int, InputType } from '@nestjs/graphql'
import { AnimeStillsType } from '@prisma/client'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { File } from '../../../common/models/results/file.model'
import { Anime } from './anime.model'
export { AnimeStillsType } from '@prisma/client'

export enum AnimeStillsSortField {
    PRIORITY = 'priority',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}

registerEnumType(AnimeStillsSortField, {
    name: 'AnimeStillsSortField'
})

registerEnumType(AnimeStillsType, {
    name: 'AnimeStillsType'
}) 

@InputType()
export class UploadStills {
    @Field(() => Int, {
        nullable: true,
        description: 'Index to Upload file in array'
    })
    still_index?: number;

    @Field(() => String, {
        nullable: true,
        description: 'Youtube id'
    })
    url_id?: string;

    @Field(() => AnimeStillsType)
    type: AnimeStillsType

    @Field(() => Int, {
        nullable: true,
    })
    priority?: number;
}

@ObjectType()
export class Stills {
    @Field(() => ID, {
        description: 'ID of anime still'
    })
    id: string

    @Field(() => ID, {
        description: 'ID of anime'
    })
    anime_id: string

    @Field(() => ID, {
        nullable: true,
        description: "ID of source"
    })
    frame_id?: string

    @Field(() => String, {
        nullable: true,
        description: "ID of source"
    })
    url_id?: string

    @Field(() => AnimeStillsType, {
        description: 'Data type of current still'
    })
    type: AnimeStillsType

    @Field(() => Int, {
        nullable: true,
        defaultValue: 'Priority of stills 1, 2, 3 etc...'
    })
    priority: number

    @Field(() => Date, {
        description: 'Created at Date'
    })
    created_at: Date

    @Field(() => Date, {
        description: 'Updated at Date'
    })
    updated_at: Date

    @Field(() => File, {
        nullable: true,
        description: 'File\'s metadata'
    })
    frame?: File

    @Field(() => Anime, {
        description: 'Parrent anime'
    })
    anime: Anime
}