import { ArgsType, Field, ID } from 'type-graphql';
import {
    IsOptional,
    IsString,
    Length,
} from 'class-validator';

import {CharacterType} from "../../../../common/models/enums";

// добавлены декораторы необязательности, опциональные операторы? + опции {nullable:true}
@ArgsType()
export class UpdateCharacterInputType {
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
    @IsString()
    @Field(() => CharacterType, {
        nullable: true,
        defaultValue: CharacterType.PROTAGONIST
    })
    importance?: CharacterType;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    description?: string;

}
