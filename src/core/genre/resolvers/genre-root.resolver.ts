import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Database from '../../../database';
import { CreateGenreResultsType } from '../results/create-genre-results.type';
import { GetListGenreResultsType } from '../results/get-list-genre-results.type';
import { DeleteGenreResultsType } from '../results/delete-genre-results.type';
import { GetGenreResultsType } from '../results/get-genre-results.type';
import { GenreService } from '../services/genre.service';
import { UpdateGenreResultsType } from '../results/update-genre-results.type';

@ObjectType()
export class GenreMutationType {
    @Field(() => CreateGenreResultsType, { description: 'Create genre' })
    createGenre: CreateGenreResultsType;

    @Field(() => UpdateGenreResultsType, { description: 'Update genre' })
    updateGenre: UpdateGenreResultsType;

    @Field(() => DeleteGenreResultsType, { description: 'Delete genre' })
    deleteGenre: DeleteGenreResultsType;
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
    protected readonly prisma = Database.getInstance().logic;
    protected readonly genreService: GenreService = new GenreService();

    @Mutation(() => GenreMutationType, { description: 'Genre mutations' })
    genreMutations() {
        return {};
    }

    @Query(() => GenreQueryType, { description: 'Genre queries' })
    genreQueries() {
        return {};
    }
}
