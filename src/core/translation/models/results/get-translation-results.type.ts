import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Translation } from '../translation.model';

@ObjectType()
export class GetTranslationResultsType extends BaseResultsType {
    @Field(() => Translation, {
        nullable: true,
        description: 'Translation',
    })
    translation: Translation | null;
}
