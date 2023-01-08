import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsString, Length } from '@nestjs/class-validator';
import { CharacterRole, CharacterType } from '../../../../common/models/enums';

@ArgsType()
export class CreateCharacterInputType {
    @IsString()
    @Field(() => String)
    bucket_id: string;

    @IsString()
    @Length(1, 50)
    @Field(() => String)
    character_name: string;

    @IsEnum(CharacterType)
    @Field(() => CharacterType, { defaultValue: CharacterType.PROTAGONIST })
    importance: CharacterType;

    @IsEnum(CharacterRole)
    @Field(() => CharacterRole, { defaultValue: CharacterRole.MAIN })
    role: CharacterRole;

    @IsString()
    @Field(() => String)
    description: string;
}
