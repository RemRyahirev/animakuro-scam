import { ArgsType, Field, registerEnumType } from 'type-graphql';
import {IsString, Length } from "class-validator";
import {CharacterType} from "../../../../common/models/enums";

registerEnumType(CharacterType, {
    name: 'CharacterType',
});
// здесь - усложнённые типы: в enum-ах = enumы
@ArgsType()
export class CreateCharacterInputType {

    @IsString()
    @Field(() => String)
    bucket_id: string;

    @IsString()
    @Length(1, 50)
    @Field(() => String)
    character_name: string;

    @IsString()
    @Field(() => CharacterType, { defaultValue: CharacterType.PROTAGONIST })
    importance: CharacterType;

    @IsString()
    @Field(() => String)
    description: string;

}
