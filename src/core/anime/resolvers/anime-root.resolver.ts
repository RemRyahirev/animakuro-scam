import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';
import { UpdateRatingAnimeResultsType } from '../models/results/update-rating-anime-result.type';
import { GetStillsByAnimeIdResultsType } from '../models/results/get-stills-by-animeId-results.type';
import { DeleteAnimeStillsResultsType } from '../models/results/delete-anime-stills-results.type';
import { AddAnimeStillsResultsType } from '../models/results/add-anime-stills-results.type';
@ObjectType()
export class AnimeMutationType {
    @Field(() => CreateAnimeResultsType, { description: 'Create anime' })
    createAnime: CreateAnimeResultsType;

    @Field(() => UpdateAnimeResultsType, { description: 'Update anime' })
    updateAnime: UpdateAnimeResultsType;

    @Field(() => DeleteAnimeResultsType, { description: 'Delete anime' })
    deleteAnime: DeleteAnimeResultsType;

    @Field(() => DeleteAnimeStillsResultsType, {
        description: 'Delete anime stills'
    })
    deleteAnimeStills: DeleteAnimeStillsResultsType

    @Field(() => AddAnimeStillsResultsType, {
        description: 'Add stils to anime'
    })
    addAnimeStills: AddAnimeStillsResultsType;

    @Field(() => UpdateAnimeResultsType, {
        description: 'Add to the list of relating animes',
    })
    addRelatedAnime: UpdateAnimeResultsType;

    @Field(() => UpdateAnimeResultsType, {
        description: 'remove from the list of relating animes',
    })
    deleteRelatedAnime: UpdateAnimeResultsType;

    @Field(() => UpdateAnimeResultsType, {
        description: 'updating the list of relating animes',
    })
    updateRelatedAnime: UpdateAnimeResultsType;

    @Field(() => UpdateAnimeResultsType, {
        description: 'Add to the list of similar animes',
    })
    addSimilarAnime: UpdateAnimeResultsType;

    @Field(() => UpdateAnimeResultsType, {
        description: 'remove from the list of similar animes',
    })
    deleteSimilarAnime: UpdateAnimeResultsType;

    @Field(() => UpdateAnimeResultsType, {
        description: 'updating the list of similar animes',
    })
    updateSimilarAnime: UpdateAnimeResultsType;

    @Field(() => UpdateRatingAnimeResultsType, {
        description: 'update reyting by Anime',
    })
    updateRatingAnime: UpdateRatingAnimeResultsType;
}

@ObjectType()
export class AnimeQueryType {
    @Field(() => GetAnimeResultsType, { description: 'Get anime by ID' })
    getAnime: GetAnimeResultsType;

    @Field(() => GetListAnimeResultsType, { description: 'Get anime list' })
    getAnimeList: GetListAnimeResultsType;

    @Field(() => GetListRelatedAnimeByAnimeIdResultsType, {
        description: 'Get Related anime list by anime ID',
    })
    getRelatedAnimeListByAnimeId: GetListRelatedAnimeByAnimeIdResultsType;

    @Field(() => GetListSimilarAnimeByAnimeIdResultsType, {
        description: 'Get Similar anime list by anime ID',
    })
    getSimilarAnimeListByAnimeId: GetListSimilarAnimeByAnimeIdResultsType;

    @Field(() => GetStillsByAnimeIdResultsType, {
        description: 'Get stills by anime id'
    })
    getStillsByAnimeId: GetStillsByAnimeIdResultsType
}

@Resolver()
export class AnimeRootResolver {
    @Mutation(() => AnimeMutationType, { description: 'Anime mutations' })
    animeMutations() {
        return {};
    }

    @Query(() => AnimeQueryType, { description: 'Anime queries' })
    animeQueries() {
        return {};
    }
}
