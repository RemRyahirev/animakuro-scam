import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 64)
    username: string

    @Field()
    @Length(1, 320)
    @IsEmail()
    email: string

    @Field()
    @Length(1, 255)
    password: string
}

@InputType()
export class ConfirmInput {
    @Field()
    @Length(1, 255)
    token: string
}

@InputType()
export class LoginInput {
    @Field()
    @Length(1, 64)
    username: string

    @Field()
    @Length(1, 255)
    password: string
}

@InputType()
export class TwoFAInput {
    @Field()
    @Length(6, 6)
    code: string

    @Field()
    @Length(1, 255)
    token: string
}

@ObjectType()
export class LoginReturnType {
    @Field(() => LoginType)
    type: LoginType

    @Field()
    token: string
}

export enum LoginType {
    AUTH,
    TWO_FA
}

registerEnumType(LoginType, {
    name: 'LoginType'
})
