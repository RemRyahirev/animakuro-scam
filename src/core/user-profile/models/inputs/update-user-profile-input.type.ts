import { ArgsType, Field, ID } from '@nestjs/graphql';
import { User } from '../../../user/models/user.model';
import { ProfileFolder } from '../../../profile-folder/models/profile-folder.model';
import { IsOptional, IsUUID } from '@nestjs/class-validator';

@ArgsType()
export class UpdateUserProfileInputType {
    @IsUUID()
    @Field(() => ID)
    id?: string;

    @IsOptional() // нужны ли эти поля здесь в принципе + будем ли редактировать ссылки на связанные таблицы?
    user?: User; // такое поле в GraphQL отсутствует!
    @IsOptional() // нужны ли эти поля здесь в принципе + будем ли редактировать ссылки на связанные таблицы?
    profileFolder?: ProfileFolder; // такое поле в GraphQL отсутствует!
    // не добавить ли вместо них userId и userAnimeId ?!??!
}
