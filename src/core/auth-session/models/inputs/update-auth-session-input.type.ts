import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsIP, IsOptional, IsString, IsUUID, Length } from "@nestjs/class-validator";

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
