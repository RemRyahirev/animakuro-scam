import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum SiteTheme {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
    AUTO = 'AUTO',
}

registerEnumType(SiteTheme, {
    name: 'SiteTheme',
});
