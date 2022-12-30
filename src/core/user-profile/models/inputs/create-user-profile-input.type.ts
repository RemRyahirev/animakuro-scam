import {ArgsType, Field, ID} from "type-graphql";
import {ModeratorRoles, SubscribeTier} from "../../../../common/models/enums";
import {IsBoolean, IsDate, IsOptional, IsString, IsUUID, Length} from "class-validator";

@ArgsType()
// перечисляем, какие аргументы вводим в инпут GraphQL при запросе на создание
// в том числе обязательные и необязательные
// проработать эти поля!
export class CreateUserProfileInputType{

    @IsOptional() // сам сгенерится Призмой
    @IsUUID()
    @Field({nullable: true})
    id?:string;

    @IsString()
    @Field()
    userId: string;

    @IsOptional()
    @IsString()
    @Length(1,30)
    @Field({nullable: true, defaultValue: 'incognito'})
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
    @Field({nullable: true, defaultValue: 'personal data not filled'})
    about?: string

    @IsOptional()
    @IsString()
    @Length(1,30)
    @Field({nullable: true})
    country?: string

    @IsOptional()
    @IsString()
    @Length(1,30)
    @Field({nullable: true})
    language: string;

    @IsOptional()
    @IsDate()
    @Field({defaultValue: new Date()})
    createdAt: Date;

    @IsOptional()
    @IsString()
    @Field(() => SubscribeTier,
        {defaultValue: SubscribeTier.FREE_ACCOUNT})
    subscribe_tier: string;

    @IsOptional()
    @IsString()
    @Field(() => ModeratorRoles,
        {defaultValue: ModeratorRoles.VIEWER})
    moderator_role: string;

    @IsOptional()
    @IsBoolean()
    @Field({defaultValue: false})
    isBlocked: boolean

}
