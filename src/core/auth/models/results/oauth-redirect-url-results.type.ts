import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';

@ObjectType()
export class OauthRedirectUrlResultsType extends BaseResultsType {
    @Field(() => String)
    redirect_url: string;
}
