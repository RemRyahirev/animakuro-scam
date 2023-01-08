import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';

@ObjectType()
export class ThirdPartyRedirectUrlResultsType extends BaseResultsType {
    @Field(() => String)
    facebook: string;
}
