import { IsOptional, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetUserProfileInputType {
    @IsOptional()
    @IsUUID()
    @Field(() => ID, { nullable: true })
    id?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    username?: string;

}
