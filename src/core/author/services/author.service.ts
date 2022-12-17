import Database from '../../../database';
import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { Author } from '../models/author.model';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';

export class AuthorService {
    private readonly prisma = Database.getInstance().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('author');

    async getAuthorInfo(id: string) {
        const author = await this.getAuthor(id);
        if (!author) {
            return {
                success: false,
                author: null,
                errors: ['Author not found'],
            };
        }
        return {
            success: true,
            author,
            errors: [],
        };
    }

    async getAuthorListInfo(args: PaginationInputType) {
        const authorList = await this.getAuthorList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            authorList,
            pagination,
        };
    }

    async createAuthorInfo(args: CreateAuthorInputType, ctx: ICustomContext) {
        const author = await this.createAuthor(args);
        return {
            success: true,
            author,
        };
    }

    async updateAuthorInfo(args: UpdateAuthorInputType, ctx: ICustomContext) {
        const author = await this.updateAuthor(args);
        return {
            success: true,
            author,
        };
    }

    async deleteAuthorInfo(id: string, ctx: ICustomContext) {
        const author = await this.deleteAuthor(id);
        return {
            success: true,
            author,
        };
    }

    async getAuthor(id: string): Promise<Author | null> {
        return await this.prisma.author.findUnique({
            where: {
                id,
            },
        });
    }

    async getAuthorList(args: PaginationInputType): Promise<Author[]> {
        return await this.prisma.author.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
    }

    async createAuthor(args: CreateAuthorInputType): Promise<Author> {
        return await this.prisma.author.create({
            data: args,
        });
    }

    async updateAuthor(args: UpdateAuthorInputType): Promise<Author> {
        return await this.prisma.author.update({
            where: { id: args.id },
            data: args,
        });
    }

    async deleteAuthor(id: string) {
        return await this.prisma.author.delete({
            where: { id },
        });
    }
}
