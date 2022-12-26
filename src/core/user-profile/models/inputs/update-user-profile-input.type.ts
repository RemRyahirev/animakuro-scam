import {ArgsType, Field, ID} from "type-graphql";
import {User} from "../../../user/models/user.model";
import {UserAnime} from "../../../user-anime/models/user-anime.model";
import {ModeratorRoles, SubscribeTier} from "../../../../common/models/enums";
import {IsBoolean, IsOptional, IsString, IsUUID, Length} from "class-validator";

@ArgsType()
export class UpdateUserProfileInputType{
    @IsUUID()
    @Field(() => ID)
    id?: string;

    @IsOptional()
    //@Field(() => User,{ nullable: true })
    user?: User;

    @IsOptional()
    //@Field(() => UserAnime,{ nullable: true })
    user_anime?: UserAnime;

    @IsOptional()
    @IsString()
    @Length(1,30)
    @Field({ nullable: true })
    displayed_name?: string;

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

    @IsOptional()
    @IsString()
    @Length(1,30)
    @Field({ nullable: true })
    language?: string;

    @IsOptional()
    @IsString()
    @Field(() => SubscribeTier,
        {
            nullable: true,
            defaultValue: SubscribeTier.FREE_ACCOUNT
        })
    subscribe_tier?: string;

    @IsOptional()
    @IsString()
    @Field(() => ModeratorRoles,
        {
            nullable: true,
            defaultValue: ModeratorRoles.VIEWER
        })
    moderator_role?: string;

    @IsOptional()
    @IsBoolean()
    @Field({
        nullable: true,
        defaultValue: false
    })
    isBlocked?: boolean

}
