import { ArgsType, Field } from '@nestjs/graphql';
import { ModeratorRoles } from '../../../../common/models/enums';
import {
    IsBoolean,
    IsDate,
    IsOptional,
    IsString,
    IsUUID,
} from '@nestjs/class-validator';

@ArgsType()
// перечисляем, какие аргументы вводим в инпут GraphQL при запросе на создание
// в том числе обязательные и необязательные
// проработать эти поля!
export class CreateUserProfileInputType {
    @IsOptional() // сам сгенерится Призмой
    @IsUUID()
    @Field({ nullable: true })
    id?: string;

    @IsString()
    @Field()
    user_id: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true, defaultValue: 'personal data not filled' })
    about?: string;

    @IsOptional()
    @IsDate()
    @Field({ defaultValue: new Date() })
    created_at: Date;

    @IsOptional()
    @IsString()
    @Field(() => ModeratorRoles, { defaultValue: ModeratorRoles.VIEWER })
    moderator_role: string;

    @IsOptional()
    @IsBoolean()
    @Field({ defaultValue: false })
    is_blocked: boolean;
}
