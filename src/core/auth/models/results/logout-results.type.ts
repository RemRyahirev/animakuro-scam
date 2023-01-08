import { ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';

@ObjectType()
export class LogoutResultsType extends BaseResultsType {}
