import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Database from '../../../database';
import { CreateAnimeResultsType } from "../results/create-anime-results.type";
import { AnimeService } from "../services/anime.service";

@ObjectType()
export class AnimeMutationType {
    @Field(() => CreateAnimeResultsType, { description: 'Create anime' })
    createAnime: CreateAnimeResultsType;
}

@ObjectType()
export class AnimeQueryType {
    @Field(() => CreateAnimeResultsType, { description: 'Get anime by ID' })
    getAnime: CreateAnimeResultsType;
}

@Resolver()
export class AnimeRootResolver {
    protected readonly prisma = Database.getInstance().logic;
    protected readonly animeService: AnimeService = new AnimeService();

    @Mutation(() => AnimeMutationType, { description: 'Anime mutations' })
    animeMutations() {
        return {};
    }

    @Query(() => AnimeQueryType, { description: 'Anime queries' })
    animeQueries() {
        return {};
    }
}
