import { Field, ID, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { GraphQLUpload } from 'graphql-upload'
import { IUpload } from '../../types/upload.interface'
// id           String   @id @default(uuid())
// username     String   @unique @db.VarChar(64)
// email        String   @db.VarChar(320)
// password     String?  @db.VarChar(60)
//     secret2fa    String?  @db.VarChar(20)
//     avatar       String?  @db.Text
//     banner       String?  @db.Text
//     birthday     Date?    @db.Date
//     gender       Gender   @default(UNSPECIFIED)
// customGender String?  @db.VarChar(64)
//     createdAt    DateTime @default(now())
// deleted      Boolean  @default(false)
//
// siteAuthSessions SiteAuthSession[]

export enum Gender {
    UNSPECIFIED = "UNSPECIFIED",
    MALE = "MALE",
    FEMALE = "FEMALE",
    CUSTOM = "CUSTOM"
}

registerEnumType(Gender, {
    name: 'Gender'
})

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field({ nullable: true })
    banner?: string;

    @Field({ nullable: true })
    birthday?: Date;

    @Field({defaultValue: Gender.UNSPECIFIED})
    gender: Gender;

    @Field({ nullable: true })
    customGender?: string
}

//
@InputType()
export class UserInput {
    @Field({ nullable: true })
    @Length(1, 64)
    username?: string

    @Field({ nullable: true })
    @Length(1, 320)
    @IsEmail()
    email?: string

    @Field({ nullable: true })
    @Length(1, 255)
    password?: string

    @Field({ nullable: true })
    @Length(1, 255)
    newPassword?: string

    @Field({ nullable: true })
    birthday?: Date;

    @Field({ nullable: true })
    gender?: Gender;

    @Field({ nullable: true })
    customGender?: string

    @Field(() => GraphQLUpload, { nullable: true })
    avatar?: IUpload

    @Field(() => GraphQLUpload, { nullable: true })
    banner?: IUpload
}
