import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { CreateUserAnimeResultsType } from '../models/results/create-user-anime-results.type';
import { UserAnimeService } from '../services/user-anime.service';
import { UpdateUserAnimeResultsType } from '../models/results/update-user-anime-results.type';
import { DeleteUserAnimeResultsType } from '../models/results/delete-user-anime-results.type';
import { GetListUserAnimeResultsType } from '../models/results/get-list-user-anime-results.type';
import { GetUserAnimeResultsType } from '../models/results/get-user-anime-results.type';

@ObjectType()
export class UserAnimeMutationType {
    @Field(() => CreateUserAnimeResultsType, { description: 'Create user anime' })
    createUserAnime: CreateUserAnimeResultsType;

    @Field(() => UpdateUserAnimeResultsType, { description: 'Update user anime' })
    updateUserAnime: UpdateUserAnimeResultsType;

    @Field(() => DeleteUserAnimeResultsType, { description: 'Delete user anime' })
    deleteUserAnime: DeleteUserAnimeResultsType;
}

@ObjectType()
export class UserAnimeQueryType {
    @Field(() => GetUserAnimeResultsType, { description: 'Get user anime by ID' })
    getUserAnime: GetUserAnimeResultsType;

    @Field(() => GetListUserAnimeResultsType, { description: 'Get user anime list' })
    getUserAnimeList: GetListUserAnimeResultsType;
}

@Resolver()
export class UserAnimeRootResolver {
    protected readonly userAnimeService: UserAnimeService = new UserAnimeService();

    @Mutation(() => UserAnimeMutationType, { description: 'User Anime mutations' })
    userAnimeMutations() {
        return {};
    }

    @Query(() => UserAnimeQueryType, { description: 'User Anime queries' })
    userAnimeQueries() {
        return {};
    }
}
