import { IsBoolean, IsIP, IsOptional, IsString, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateAuthSessionInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: 'User agent',
    })
    agent: string;

    @IsOptional()
    @IsIP()
    @Field(() => String, {
        nullable: true,
        description: 'IP',
    })
    ip: string;

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, {
        nullable: true,
        description: 'Active state',
    })
    active: boolean;
}
