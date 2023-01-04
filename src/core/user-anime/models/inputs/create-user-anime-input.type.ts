import {ArgsType, Field, Int} from "type-graphql";
import {WatchStatus} from "../../../../common/models/enums";
import {IsBoolean, IsNumber, IsOptional, IsString, IsUUID} from "class-validator";

@ArgsType()
// перечисляем, какие аргументы вводим в инпут GraphQL при запросе на создание
// в том числе обязательные и необязательные
// проработать эти поля!
export class CreateUserAnimeInputType {

    @IsOptional() // сам сгенерится Призмой
    @IsUUID()
    @Field({nullable: true})
    id?:string;

    @IsString()
    @Field()
    userProfileId: string;

    @IsString()
    @Field()
    animeId: string;

    @IsOptional()
    @IsString()
    @Field(() => WatchStatus,
        { nullable: true, defaultValue: WatchStatus.WATCHING })
    status: string;

    @IsOptional()
    @IsBoolean()    // нужен ли nullable:true ?
    @Field({ nullable: true, defaultValue: false})
    in_favourites: boolean

    @IsOptional()
    @IsNumber()
    @Field(() => Int, { nullable: true,
        description: "какой сезон данного аниме смотрит юзер"})
    season?: number

    @IsOptional()
    @IsNumber()
    @Field(() => Int, { nullable: true,
        description: "какой эпизод(серию)"})
    episode?: number

    @IsOptional()
    @IsNumber()
    @Field(() => Int, {nullable: true,
        description: "секунды: продолжительность этого эпизода"})
    episode_duration?: number

    @IsOptional()
    @IsNumber()
    @Field(() => Int, {nullable: true,
        description: "секунды: сколько просмотрел из этой серии"})
    watched_duration?: number
}
