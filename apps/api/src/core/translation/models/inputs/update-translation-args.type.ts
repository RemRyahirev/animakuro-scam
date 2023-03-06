import { IsString, IsUUID, Length } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateTranslationArgsType {
    @IsUUID(4)
    @Field(() => ID)
    id: string;

    @IsString()
    @Length(1, 20)
    @Field(() => String, { nullable: true })
    language?: string;

    @IsString()
    @Field(() => String, { nullable: true })
    translation?: string;
}
