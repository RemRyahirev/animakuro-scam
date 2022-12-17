import Database from '../../../database';
import { PaginationInputType } from '../../../common/models/inputs';
import { CreateGenreInputType } from '../models/inputs/create-genre-input.type';
import { UpdateGenreInputType } from '../models/inputs/update-genre-input.type';
import { Genre } from '../models/genre.model';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';

export class GenreService {
    private readonly prisma = Database.getInstance().logic;
    protected readonly genreService: GenreService = new GenreService();
    protected readonly paginationService: PaginationService =
        new PaginationService('genre');

    async createGenreInfo(args: CreateGenreInputType, ctx: ICustomContext) {
        const genre = await this.genreService.createGenre(args);
        return {
            success: true,
            genre,
        };
    }

    async updateGenreInfo(args: UpdateGenreInputType, ctx: ICustomContext) {
        const genre = await this.genreService.updateGenre(args);
        return {
            success: true,
            genre,
        };
    }

    async deleteGenreInfo(id: string, ctx: ICustomContext) {
        const genre = await this.genreService.deleteGenre(id);
        return {
            success: true,
            genre,
        };
    }

    async getGenreInfo(id: string) {
        const genre = await this.genreService.getGenre(id);
        if (!genre) {
            return {
                success: false,
                genre: null,
                errors: ['Anime not found'],
            };
        }
        return {
            success: true,
            genre,
            errors: [],
        };
    }

    async getGenreListInfo(args: PaginationInputType) {
        const genreList = await this.genreService.getGenreList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            genreList,
            pagination,
        };
    }

    async getGenre(id: string): Promise<Genre | null> {
        return await this.prisma.genre.findUnique({
            where: {
                id,
            },
        });
    }

    async getGenreList(args: PaginationInputType): Promise<Genre[]> {
        return await this.prisma.genre.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
    }

    async createGenre(args: CreateGenreInputType): Promise<Genre> {
        return await this.prisma.genre.create({
            data: args,
        });
    }

    async updateGenre(args: UpdateGenreInputType): Promise<Genre> {
        return await this.prisma.genre.update({
            where: { id: args.id },
            data: args,
        });
    }

    async deleteGenre(id: string) {
        return await this.prisma.genre.delete({
            where: { id },
        });
    }
}
