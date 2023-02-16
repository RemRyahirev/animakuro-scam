import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from '@nestjs/class-validator';

@ArgsType()
// перечисляем, какие аргументы вводим в инпут GraphQL при запросе на создание
// в том числе обязательные и необязательные
// проработать эти поля!
export class CreateUserProfileInputType {
    @IsString()
    @Field()
    user_id: string;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    banner?: Promise<FileUpload>;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    cover?: Promise<FileUpload>;
}
