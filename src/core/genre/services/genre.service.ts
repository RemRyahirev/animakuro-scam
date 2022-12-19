import { Database } from '../../../loaders';
import { PaginationInputType } from '../../../common/models/inputs';
import { CreateGenreInputType } from '../models/inputs/create-genre-input.type';
import { UpdateGenreInputType } from '../models/inputs/update-genre-input.type';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';
import { GetGenreResultsType } from '../models/results/get-genre-results.type';
import { GetListGenreResultsType } from '../models/results/get-list-genre-results.type';
import { CreateGenreResultsType } from '../models/results/create-genre-results.type';
import { UpdateGenreResultsType } from '../models/results/update-genre-results.type';
import { DeleteGenreResultsType } from '../models/results/delete-genre-results.type';

export class GenreService {
    private readonly prisma = new Database().logic;
    protected readonly paginationService: PaginationService =
        new PaginationService('genre');

    async getGenre(id: string): Promise<GetGenreResultsType> {
        const genre = await this.prisma.genre.findUnique({
            where: {
                id,
            },
        });
        if (!genre) {
            return {
                success: false,
                genre: null,
            };
        }
        return {
            success: true,
            genre,
            errors: [],
        };
    }

    async getGenreList(
        args: PaginationInputType,
    ): Promise<GetListGenreResultsType> {
        const genreList = await this.prisma.genre.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            genreList,
            pagination,
        };
    }

    async createGenre(
        args: CreateGenreInputType,
        ctx: ICustomContext,
    ): Promise<CreateGenreResultsType> {
        const genre = await this.prisma.genre.create({
            data: args,
        });
        return {
            success: true,
            genre,
        };
    }

    async updateGenre(
        args: UpdateGenreInputType,
        ctx: ICustomContext,
    ): Promise<UpdateGenreResultsType> {
        const genre = await this.prisma.genre.update({
            where: { id: args.id },
            data: args,
        });
        return {
            success: true,
            genre,
        };
    }

    async deleteGenre(
        id: string,
        ctx: ICustomContext,
    ): Promise<DeleteGenreResultsType> {
        const genre = await this.prisma.genre.delete({
            where: { id },
        });
        return {
            success: true,
            genre,
        };
    }
}
