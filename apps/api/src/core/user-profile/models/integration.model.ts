import { IsEnum } from 'class-validator';
import { IsUrl, Length } from '@nestjs/class-validator';
import { InputType, ObjectType } from '@nestjs/graphql';

import { ProfileIntegrations } from '@app/common/models/enums';

@ObjectType()
export class Integration {
    name: ProfileIntegrations;
    url: string;
}

@InputType()
export class IntegrationInputType {
    @IsEnum(ProfileIntegrations)
    name: ProfileIntegrations;

    @IsUrl()
    @Length(10, 70)
    url: string;
}
