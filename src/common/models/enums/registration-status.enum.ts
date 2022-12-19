import { registerEnumType } from 'type-graphql';

export enum RegistrationStatus {
    CONFIRM_EMAIL = 'CONFIRM_EMAIL',
    ACTIVE = 'ACTIVE',
}

registerEnumType(RegistrationStatus, {
    name: 'RegistrationStatus',
});
