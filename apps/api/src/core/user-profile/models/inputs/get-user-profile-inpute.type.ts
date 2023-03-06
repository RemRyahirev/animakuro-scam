import { IsOptional, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetUserProfileArgsType {
    @IsOptional()
    @IsUUID()
    @Field(() => ID)
    id?: string;

    @IsOptional()
    username?: string;

}
