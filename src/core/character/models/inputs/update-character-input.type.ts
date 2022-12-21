import { ArgsType, Field, ID } from 'type-graphql';
import { IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { CharacterRole, CharacterType } from '../../../../common/models/enums';

@ArgsType()
export class UpdateCharacterInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    bucket_id?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    @Field(() => String, { nullable: true })
    character_name?: string;

    @IsOptional()
    @IsEnum(CharacterType)
    @Field(() => CharacterType, {
        nullable: true,
        defaultValue: CharacterType.PROTAGONIST,
    })
    importance?: CharacterType;

    @IsOptional()
    @IsEnum(CharacterRole)
    @Field(() => CharacterRole, { defaultValue: CharacterRole.MAIN })
    role?: CharacterRole;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    description?: string;
}
