import { ArgsType, Field, ID } from '@nestjs/graphql';
import { User } from '../../../user/models/user.model';
import { UserAnime } from '../../../user-anime/models/user-anime.model';
import { ModeratorRoles, SubscribeTier } from '../../../../common/models/enums';
import {
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';

@ArgsType()
export class UpdateUserProfileInputType {
    @IsUUID()
    @Field(() => ID)
    id?: string;

    @IsOptional() // нужны ли эти поля здесь в принципе + будем ли редактировать ссылки на связанные таблицы?
    user?: User; // такое поле в GraphQL отсутствует!
    @IsOptional() // нужны ли эти поля здесь в принципе + будем ли редактировать ссылки на связанные таблицы?
    userAnime?: UserAnime; // такое поле в GraphQL отсутствует!
    // не добавить ли вместо них userId и userAnimeId ?!??!

    @IsOptional()
    @IsString()
    @Length(1, 30)
    @Field({ nullable: true })
    displayed_name?: string;

    @IsOptional()
    @IsUUID()
    @Field({ nullable: true, description: 'internal CDN ID/uuid' })
    profile_picture_id?: string;

    @IsOptional()
    @IsUUID()
    @Field({ nullable: true, description: 'internal CDN ID/uuid' })
    banner_image?: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    about?: string;

    @IsOptional()
    @IsString()
    @Length(1, 30)
    @Field({ nullable: true })
    country?: string;

    @IsOptional()
    @IsString()
    @Length(1, 30)
    @Field({ nullable: true })
    language?: string;

    @IsOptional()
    @IsString()
    @Field(() => SubscribeTier, {
        nullable: true,
        defaultValue: SubscribeTier.FREE_ACCOUNT,
    })
    subscribe_tier?: string;

    @IsOptional()
    @IsString()
    @Field(() => ModeratorRoles, {
        nullable: true,
        defaultValue: ModeratorRoles.VIEWER,
    })
    moderator_role?: string;

    @IsOptional()
    @IsBoolean()
    @Field({
        nullable: true,
        defaultValue: false,
    })
    is_blocked?: boolean;
}
