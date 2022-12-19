import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum RegistrationStatus {
    CONFIRM_EMAIL = 'CONFIRM_EMAIL',
    ACTIVE = 'ACTIVE',
}

registerEnumType(RegistrationStatus, {
    name: 'RegistrationStatus',
});
