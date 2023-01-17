import { Gender } from '../../common/models/enums';

export const userData = async () => [
    {
        id: '90530696-1da8-4156-9b77-538d344d53ca',
        email: 'alexander@mail.ru',
        username: 'Alexander',
        password: '$2b$10$zfTmralcT619fZHCl0Tml.CzzvDm0tti6qcewAOWMBGBwylIBa/x2', // password
        gender: Gender.MALE,
        is_email_confirmed: true,
        avatar: '',
    },
    {
        id: '5b594675-a3c6-4e1b-acaa-2e612419b9e2',
        email: 'alexander@mail.ru',
        username: 'Anatolii',
        password: '$2b$10$zfTmralcT619fZHCl0Tml.CzzvDm0tti6qcewAOWMBGBwylIBa/x2', // password
        gender: Gender.MALE,
        is_email_confirmed: true,
        avatar: '',
    },
    {
        id: '71d46841-94f0-4310-88c3-662b7fd817ec',
        email: 'alexander@mail.ru',
        username: 'Evgenii',
        password: '$2b$10$zfTmralcT619fZHCl0Tml.CzzvDm0tti6qcewAOWMBGBwylIBa/x2', // password
        gender: Gender.MALE,
        is_email_confirmed: true,
        avatar: '',
    },
    {
        id: '03c6c54d-8597-43b8-a793-4fb36522cc61',
        email: 'oleg@icloud.com',
        username: 'Oleg',
        password: '$2b$10$UTBzDrug3h9HvegQbhg6UuEqg8Be8hj8JS2WD3AJl9cg7RdfWjfHi', // another-password
        gender: Gender.MALE,
        is_email_confirmed: false,
        avatar: '',
    },
    {
        id: '4c323fe8-d35a-4e84-9f75-92f20fcec028',
        email: 'irina@google.com',
        username: 'Irina',
        password: '$2b$10$LfmYoVBbTMMaRfR4VZRUw.9UGRla.UDJ0icOkj4LrpUJomMFdzlXm', // some-password
        gender: Gender.FEMALE,
        is_email_confirmed: false,
        avatar: '',
    },
    {
        id: '2b2133d4-6973-4c15-88a6-8b8c19c96fab',
        email: 'irina@google.com',
        username: 'Svetlana',
        password: '$2b$10$LfmYoVBbTMMaRfR4VZRUw.9UGRla.UDJ0icOkj4LrpUJomMFdzlXm', // some-password
        gender: Gender.FEMALE,
        is_email_confirmed: false,
        avatar: '',
    },
];
