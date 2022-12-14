import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Database from '../../../database';
import { CreateAnimeResultsType } from "../results/create-anime-results.type";

@ObjectType()
export class AnimeMutationType {
    @Field(() => CreateAnimeResultsType, { description: 'Create anime' })
    createAnime: CreateAnimeResultsType;
}

@ObjectType()
export class AnimeQueryType {
    @Field(() => CreateAnimeResultsType, { description: 'Get anime' })
    getAnime: CreateAnimeResultsType;
}

@Resolver()
export class AnimeRootResolver {
    protected readonly prisma = Database.getInstance().logic;

    @Mutation(() => AnimeMutationType, { description: 'Anime mutations' })
    animeMutations() {
        return {};
    }

    @Query(() => AnimeQueryType, { description: 'Anime queries' })
    animeQueries() {
        return {};
    }
}
