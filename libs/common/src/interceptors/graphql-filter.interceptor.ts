import { map, Observable } from 'rxjs';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

type ExtensionData = {
    path: string;
    extensions: Record<string, any>;
};
type NodeEntry = {
    parent: any;
    field: string;
    node: any;
};

const scanInfoForExtensions = (
    node: any,
    path = '',
): ExtensionData[] => {
    let result: ExtensionData[] = [];
    const newPath = path + '.' + node.name;

    if (
        node.extensions &&
        Object.keys(node.extensions).filter(name => name !== 'complexity').length
    ) {
        result.push({
            path: newPath.split('.').slice(2).join('.'),
            extensions: { ...node.extensions },
        });
    }

    let child = node.type?.ofType?.ofType || node.type?.ofType;

    if (!child && newPath.split('.').length < 12 && (node.type?._fields || node.type?.extensions)) {
        child = node.type;
    }

    if (!child) {
        return result;
    }

    if (child._fields) {
        const keys = Object
            .keys(child._fields)
            .filter(name => !['args', 'resolve', 'subscribe', 'deprecationReason', 'extensions', 'astNode'].includes(name))

        for (const key of keys) {
            const res = scanInfoForExtensions(child._fields[key], newPath + (node.type?.ofType?.ofType ? '[]' : ''));
            result.push(...res);
        }
    }

    if (
        child.extensions &&
        Object.keys(child.extensions).filter(name => name !== 'complexity').length
    ) {
        result.push({
            path: newPath.split('.').slice(2).join('.'),
            extensions: { ...child.extensions },
        });
    }

    return result;
};

const getEntriesFromPath = (
    node: any,
    path: string,
): NodeEntry[] => {
    let fieldNames = path.split('.');

    let field = fieldNames.shift();
    const restPath = fieldNames.join('.');

    if (!field) {
        return [];
    }

    if (field.endsWith('[]')) {
        field = field.slice(0, -2);

        if (!node[field]) {
            return [];
        }

        return node[field].reduce((acc: any[], child: any) => {
            acc.push(...getEntriesFromPath(child, restPath));
            return acc;
        }, []);
    }

    if (!node[field]) {
        return [];
    }

    if (fieldNames.length) {
        return getEntriesFromPath(node[field], restPath);
    }

    return [{
        parent: node,
        field,
        node: node[field],
    }];
}

const userIdFilter = (
    parent: any,
    field: string,
    settings: { userIdField: string },
    userId: string,
) => {
    let searchPath = settings.userIdField;
    let searchNode = parent[field];

    if (searchPath.startsWith('@')) {
        searchPath = searchPath.substring(1);
        searchNode = parent;
    }

    const entries = getEntriesFromPath(searchNode, searchPath).map(el => el.node);

    if (!entries.length) {
        parent[field] = null;
    }

    const someBad = entries.some(entry => entry !== userId);

    if (someBad) {
        parent[field] = null;
    }
}

@Injectable()
export class GraphqlFilterInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        return next.handle()
            .pipe(
                map(value => {
                    this.applyFilters(value, context);

                    return value;
                }),
            );
    }

    private applyFilters(
        value: any,
        context: ExecutionContext,
    ) {
        const gqlCtx = GqlExecutionContext.create(context);
        const ctx = gqlCtx.getContext();
        const userId = ctx?.req?.user_id;

        const info = gqlCtx.getInfo();
        const parentNode = info.parentType.getFields()[info.fieldName];
        const extensions = scanInfoForExtensions(parentNode);

        // path by length asc sort (upside down though tree because parent filter may depend on child fields)
        extensions.sort((a, b) => a.path.split('.').length - b.path.split('.').length);
        extensions.forEach(ext => {
            if (ext.extensions.userIdFilter) {
                const entries = getEntriesFromPath(value, ext.path);
                entries.forEach(entry => {
                    userIdFilter(entry.parent, entry.field, ext.extensions.userIdFilter, userId);
                });
            }
        });
    }
}
