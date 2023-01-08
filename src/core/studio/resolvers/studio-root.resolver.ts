import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { DeleteStudioResultsType } from '../models/results/delete-studio-results.type';
import { GetStudioResultsType } from '../models/results/get-studio-results.type';
import { GetListStudioResultsType } from '../models/results/get-list-studio-results.type';
import { UpdateStudioResultsType } from '../models/results/update-studio-results.type';
import { CreateStudioResultsType } from '../models/results/create-studio-results.type';

@ObjectType()
export class StudioMutationType {
    @Field(() => CreateStudioResultsType, { description: 'Create studio' })
    createStudio: CreateStudioResultsType;

    @Field(() => UpdateStudioResultsType, { description: 'Update studio' })
    updateStudio: UpdateStudioResultsType;

    @Field(() => DeleteStudioResultsType, { description: 'Delete studio' })
    deleteStudio: DeleteStudioResultsType;
}

@ObjectType()
export class StudioQueryType {
    @Field(() => GetStudioResultsType, { description: 'Get studio by ID' })
    getStudio: GetStudioResultsType;

    @Field(() => GetListStudioResultsType, { description: 'Get studio list' })
    getStudioList: GetListStudioResultsType;
}

@Resolver()
export class StudioRootResolver {
    @Mutation(() => StudioMutationType, { description: 'Studio mutations' })
    studioMutations() {
        return {};
    }

    @Query(() => StudioQueryType, { description: 'Studio queries' })
    studioQueries() {
        return {};
    }
}
