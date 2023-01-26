import { ArgsType, Field, ID } from '@nestjs/graphql';
import { User } from '../../../user/models/user.model';
import { UserAnime } from '../../../user-anime/models/user-anime.model';
import { ModeratorRoles } from '../../../../common/models/enums';
import {
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
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
    @Field({ nullable: true })
    about?: string;

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
