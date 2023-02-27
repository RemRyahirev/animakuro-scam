import { ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

@ObjectType()
export class ConfirmRegistrationResultsType extends BaseResultsType {}
