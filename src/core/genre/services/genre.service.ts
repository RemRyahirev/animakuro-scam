import Database from '../../../database';
import { PaginationInputType } from '../../../common/models/inputs';
import { CreateGenreInputType } from '../models/inputs/create-genre-input.type';
import { UpdateGenreInputType } from '../models/inputs/update-genre-input.type';
import { Genre } from '../models/genre.model';

export class GenreService {
    private readonly prisma = Database.getInstance().logic;

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
