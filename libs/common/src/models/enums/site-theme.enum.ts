import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { SiteTheme } from '@prisma/client';
export { SiteTheme } from '@prisma/client';

registerEnumType(SiteTheme, {
    name: 'SiteTheme',
});
