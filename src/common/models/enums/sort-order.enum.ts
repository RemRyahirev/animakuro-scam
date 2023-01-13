import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum SortOrder {
    DESC = 'desc',
    ASC = 'asc',
}

registerEnumType(SortOrder, {
    name: 'SortOrder',
});
