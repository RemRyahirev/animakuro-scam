import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from '@nestjs/class-validator';

@ArgsType()
// перечисляем, какие аргументы вводим в инпут GraphQL при запросе на создание
// в том числе обязательные и необязательные
// проработать эти поля!
export class CreateUserProfileInputType {
    @IsString()
    @Field()
    user_id: string;
}
