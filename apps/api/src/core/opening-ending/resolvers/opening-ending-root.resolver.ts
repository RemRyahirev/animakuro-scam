import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { GetOpeningEndingListResultsType } from '../models/results/get-opening-ending-list-results.type';
import { CreateOpeningEndingResultsType } from '../models/results/create-opening-ending-results.type';
import { UpdateOpeningEndingResultsType } from '../models/results/update-opening-ending-results.type';
import { GetOpeningEndingResultsType } from '../models/results/get-opening-ending-results.type';
import { DeleteOpeningEndingResultsType } from '../models/results/delete-opening-ending-reslts.type';

@ObjectType()
export class OpeningEndingQueryType {
    @Field(() => GetOpeningEndingResultsType, {
        description: 'Search for opening/ending'
    })
    getOpeningEnding: GetOpeningEndingResultsType;

    @Field(() => GetOpeningEndingListResultsType, {
        description: 'Search for opening/ending list',
    })
    getOpeningEndingList: GetOpeningEndingListResultsType;
}

@ObjectType()
export class OpeningEndingMutationType {
    @Field(() => CreateOpeningEndingResultsType, {
        description: 'Create opening/ending'
    })
    createOpeningEnding: CreateOpeningEndingResultsType

    @Field(() => UpdateOpeningEndingResultsType, {
        description: 'Update opening/ending'
    })
    updateOpeningEnding: UpdateOpeningEndingResultsType

    @Field(() => DeleteOpeningEndingResultsType, {
        description:'Deleted opening/ending'
    })
    deleteOpeningEnding: DeleteOpeningEndingResultsType
}


@Resolver()
export class OpeningEndingRootResolver {
    @Query(() => OpeningEndingQueryType, {
        description: 'Opening & ending queries'
    })
    openingEndingQueries() {
        return {};
    }

    @Mutation(() => OpeningEndingMutationType, {
        description: 'Opening & ending mutations'
    })
    openingEndingMutations() {
        return {};
    }
}
