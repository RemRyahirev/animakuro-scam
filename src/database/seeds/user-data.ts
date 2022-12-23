import { Gender } from '../../common/models/enums';

export const userData = async () => [
    {
        id: '90530696-1da8-4156-9b77-538d344d53ca',
        email: 'alexander@mail.ru',
        username: 'Alexander',
        password: '$2b$10$zfTmralcT619fZHCl0Tml.CzzvDm0tti6qcewAOWMBGBwylIBa/x2', // password
        gender: Gender.MALE,
    },
    {
        id: '03c6c54d-8597-43b8-a793-4fb36522cc61',
        email: 'oleg@icloud.com',
        username: 'Oleg',
        password: '$2b$10$UTBzDrug3h9HvegQbhg6UuEqg8Be8hj8JS2WD3AJl9cg7RdfWjfHi', // another-password
        gender: Gender.MALE,
    },
    {
        id: '4c323fe8-d35a-4e84-9f75-92f20fcec028',
        email: 'irina@google.com',
        username: 'Irina',
        password: '$2b$10$LfmYoVBbTMMaRfR4VZRUw.9UGRla.UDJ0icOkj4LrpUJomMFdzlXm', // some-password
        gender: Gender.FEMALE,
    },
];
