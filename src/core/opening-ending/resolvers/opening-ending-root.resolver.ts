import { GetOpeningListResultsType } from "../models/results/get-opening-list-results.type";
import { GetEndingListResultsType } from "../models/results/get-ending-list-results.type";
import { Field, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { GetEndingResultsType } from "../models/results/get-ending-results.type";
import { GetOpeningResultsType } from "../models/results/get-opening-results.type";
import { CreateOpeningResultsType } from "../models/results/create-opening-results.type";
import { CreateEndingResultsType } from "../models/results/create-ending-results.type";
import { UpdateOpeningResultsType } from "../models/results/update-opening-results.type";
import { UpdateEndingResultsType } from "../models/results/update-ending-results.type";


@ObjectType()
export class OpeningEndingQueryType {
    @Field(() => GetOpeningListResultsType, {
        description: 'Search for opening list',
    })
    getOpeningList: GetOpeningListResultsType;

    @Field(() => GetOpeningResultsType, {
        description: 'Search for opening'
    })
    getOpening: GetOpeningResultsType;

    @Field(() => GetEndingListResultsType, {
        description: 'Search for ending list',
    })
    getEndingList: GetEndingListResultsType;
    
    @Field(() => GetEndingResultsType, {
        description: 'Search for ending'
    })
    getEnding: GetEndingResultsType;
}

@ObjectType()
export class OpeningEndingMutationType {
    @Field(() => CreateOpeningResultsType, {
        description: 'Create opening'
    })
    createOpening: CreateOpeningResultsType

    @Field(() => CreateEndingResultsType, {
        description: 'Create ending'
    })
    createEnding: CreateEndingResultsType

    @Field(() => UpdateOpeningResultsType, {
        description: 'Update opening'
    })
    updateOpening: UpdateOpeningResultsType

    @Field(() => UpdateEndingResultsType, {
        description: 'Update ending'
    })
    updateEnding: UpdateEndingResultsType
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