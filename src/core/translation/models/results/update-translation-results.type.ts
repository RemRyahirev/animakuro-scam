import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Translation } from '../translation.model';

@ObjectType()
export class UpdateTranslationResultsType extends BaseResultsType {
    @Field(() => Translation, {
        nullable: true,
        description: 'Translation',
    })
    translation: Translation | null;
}
