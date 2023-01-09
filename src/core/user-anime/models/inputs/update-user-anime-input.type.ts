import {ArgsType, Field, Int} from '@nestjs/graphql';
import {WatchStatus} from "../../../../common/models/enums";
import {IsBoolean, IsNumber, IsOptional, IsString, IsUUID} from "class-validator";

@ArgsType()
export class UpdateUserAnimeInputType {
    @IsUUID()
    @Field()
    id?:string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    userProfileId?: string;  // пригодится ли при изменении записи?

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    animeId?: string;    // пригодится ли при изменении записи?

    @IsOptional()
    @IsString()
    @Field(() => WatchStatus,
        { nullable: true, defaultValue: WatchStatus.WATCHING })
    status?: string;

    @IsOptional()
    @IsBoolean()    // нужен ли nullable:true ?
    @Field({ nullable: true, defaultValue: false})
    in_favourites?: boolean

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
