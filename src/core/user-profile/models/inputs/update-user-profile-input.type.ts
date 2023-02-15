import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { User } from '../../../user/models/user.model';
import { UserFolder } from '../../../user-folder/models/user-folder.model';
import { IsOptional, IsUUID } from '@nestjs/class-validator';

@ArgsType()
export class UpdateUserProfileInputType {
    @IsUUID()
    @Field(() => ID)
    id?: string;

    @IsOptional() // нужны ли эти поля здесь в принципе + будем ли редактировать ссылки на связанные таблицы?
    user?: User; // такое поле в GraphQL отсутствует!
    @IsOptional() // нужны ли эти поля здесь в принципе + будем ли редактировать ссылки на связанные таблицы?
    userFolder?: UserFolder; // такое поле в GraphQL отсутствует!
    // не добавить ли вместо них userId и userAnimeId ?!??!

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    banner?: Promise<FileUpload>;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    cover?: Promise<FileUpload>;
}
