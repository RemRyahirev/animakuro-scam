import { IsUrl, Length } from '@nestjs/class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { ProfileIntegrations } from '../../../common/models/enums';

@InputType('IntegrationType')
@ObjectType('Integration')
export class Integration {
    @IsEnum(ProfileIntegrations)
    @Field(() => ProfileIntegrations)
    name: string;

    @IsUrl()
    @Length(10, 70)
    @Field(() => String)
    url: string;
}
