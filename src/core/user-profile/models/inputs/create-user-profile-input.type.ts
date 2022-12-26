import {ArgsType, Field} from "type-graphql";
import {User} from "../../../user/models/user.model";
import {UserAnime} from "../../../user-anime/models/user-anime.model";
import {ModeratorRoles, SubscribeTier} from "../../../../common/models/enums";
import {IsBoolean, IsDate, IsOptional, IsString, IsUUID, Length} from "class-validator";

@ArgsType()
export class CreateUserProfileInputType{

    //@Field(() => User)
    user: User;

    //@Field(() => UserAnime)
    user_anime: UserAnime;

    @IsString()
    @Length(1,30)
    @Field()
    displayed_name: string;

    @IsOptional()
    @IsUUID()
    @Field({nullable: true, description: 'internal CDN ID/uuid'})
    profile_picture_id?: string;

    @IsOptional()
    @IsUUID()
    @Field({nullable: true, description: 'internal CDN ID/uuid'})
    banner_image?: string;

    @IsOptional()
    @IsString()
    @Field({nullable: true})
    about?: string

    @IsOptional()
    @IsString()
    @Length(1,30)
    @Field({nullable: true})
    country?: string

    @IsString()
    @Length(1,30)
    @Field()
    language: string;

    @IsDate()
    @Field({defaultValue: new Date()})
    createdAt: Date;

    @IsString()
    @Field(() => SubscribeTier,
        {defaultValue: SubscribeTier.FREE_ACCOUNT})
    subscribe_tier: string;

    @IsString()
    @Field(() => ModeratorRoles,
        {defaultValue: ModeratorRoles.VIEWER})
    moderator_role: string;

    @IsBoolean()
    @Field({defaultValue: false})
    isBlocked: boolean

}
