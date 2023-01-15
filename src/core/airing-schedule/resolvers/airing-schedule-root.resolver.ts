import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateGenreResultsType } from '../models/results/create-genre-results.type';
import { GetListGenreResultsType } from '../models/results/get-list-genre-results.type';
import { DeleteGenreResultsType } from '../models/results/delete-genre-results.type';
import { GetGenreResultsType } from '../models/results/get-genre-results.type';
import { UpdateGenreResultsType } from '../models/results/update-genre-results.type';

@ObjectType()
export class AiringScheduleMutationType {
    @Field(() => CreateAiringScheduleResultsType, { description: 'Create AiringSchedule' })
    createGenre: CreateAiringScheduleResultsType;

    @Field(() => UpdateAiringScheduleResultsType, { description: 'Update AiringSchedule' })
    updateGenre: UpdateAiringScheduleResultsType;

    @Field(() => DeleteAiringScheduleResultsType, { description: 'Delete AiringSchedule' })
    deleteGenre: DeleteAiringScheduleResultsType;
}

@ObjectType()
export class GenreQueryType {
    @Field(() => GetGenreResultsType, { description: 'Get genre by ID' })
    getGenre: GetGenreResultsType;

    @Field(() => GetListGenreResultsType, { description: 'Get genre list' })
    getGenreList: GetListGenreResultsType;
}

@Resolver()
export class GenreRootResolver {
    @Mutation(() => GenreMutationType, { description: 'Genre mutations' })
    genreMutations() {
        return {};
    }

    @Query(() => GenreQueryType, { description: 'Genre queries' })
    genreQueries() {
        return {};
    }
}
