import { Field, ID, registerEnumType, ObjectType } from '@nestjs/graphql'
import { AnimeStillsType, AnimeStillsPriorityType } from '@prisma/client'
import { File } from '../../../common/models/results/file.model'
import { Anime } from './anime.model'
export { AnimeStillsType, AnimeStillsPriorityType } from '@prisma/client'

registerEnumType(AnimeStillsPriorityType, {
    name: 'AnimeStillsPriorityType'
}) 
registerEnumType(AnimeStillsType, {
    name: 'AnimeStillsType'
}) 

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
        description: "ID of source"
    })
    frameId: string

    @Field(() => AnimeStillsType, {
        defaultValue: 'Data type of current still'
    })
    type: AnimeStillsType

    @Field(() => AnimeStillsPriorityType, {
        nullable: true,
        defaultValue: 'Priority of stills 1, 2, 3 etc...'
    })
    priority: AnimeStillsPriorityType

    @Field(() => Date, {
        description: 'Created at Date'
    })
    created_at: Date

    @Field(() => Date, {
        description: 'Updated at Date'
    })
    updated_at: Date

    @Field(() => File, {
        description: 'File\'s metadata'
    })
    frame: File

    @Field(() => Anime, {
        description: 'Parrent anime'
    })
    anime: Anime
}