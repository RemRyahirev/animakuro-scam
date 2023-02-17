import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Translation } from '../translation.model';

@ObjectType()
export class CreateTranslationResultsType extends BaseResultsType {
    @Field(() => Translation, {
        nullable: true,
        description: 'Translation',
    })
    translation: Translation | null;
}
