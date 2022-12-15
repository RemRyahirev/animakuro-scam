import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Database from '../../../database';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaClient } from '@prisma/client';

@ObjectType()
export class AnimeMutationType {
    @Field(() => CreateAnimeResultsType, { description: 'Create anime' })
    createAnime: CreateAnimeResultsType;

    @Field(() => UpdateAnimeResultsType, { description: 'Update anime' })
    updateAnime: UpdateAnimeResultsType;

    @Field(() => DeleteAnimeResultsType, { description: 'Delete anime' })
    deleteAnime: DeleteAnimeResultsType;
}

@ObjectType()
export class AnimeQueryType {
    @Field(() => GetAnimeResultsType, { description: 'Get anime by ID' })
    getAnime: GetAnimeResultsType;

    @Field(() => GetListAnimeResultsType, { description: 'Get anime list' })
    getAnimeList: GetListAnimeResultsType;
}

@Resolver()
export class AnimeRootResolver {
    protected readonly prisma: PrismaClient = Database.getInstance().logic;
    protected readonly animeService: AnimeService = new AnimeService();
    protected readonly paginationService: PaginationService =
        new PaginationService('anime');

    @Mutation(() => AnimeMutationType, { description: 'Anime mutations' })
    animeMutations() {
        return {};
    }

    @Query(() => AnimeQueryType, { description: 'Anime queries' })
    animeQueries() {
        return {};
    }
}
