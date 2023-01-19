import { CharacterRole, CharacterType } from '../../common/models/enums';

export const characterData = async () => [
    {
        id: '08bee141-9254-4fa5-a5dd-7eb2f4f7bff9',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        name: 'Сикакунагай',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: 'какую-то роль он все-таки сыграл',
        age: 35,
        date_of_birth: '1900',
        blood_type: '2',
        gender: 'male',
        synonyms: ['Shikakunagai', '鹿角永井', '鹿角井'],
    },
    {
        id: '07730046-340c-4052-9a38-853216c283be',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        name: 'КтоУгодноСан',
        importance: CharacterType.ANTAGONIST,
        role: CharacterRole.BACKGROUND,
        description: 'главный антагонист хрен знает кого',
        age: 35,
        date_of_birth: '1900',
        blood_type: '2',
        gender: 'male',
        synonyms: ['WhoEverSan', '任何人桑', '誰でもさん'],
    },
    {
        id: '8646770a-e14d-4257-b304-f1dabffbf4e3',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        name: 'КтоТоЕщеСан',
        importance: CharacterType.ANTAGONIST,
        role: CharacterRole.SUPPORTING,
        description: 'кому то противостоит',
        age: 35,
        date_of_birth: '1900',
        blood_type: '2',
        gender: 'male',
        synonyms: ['SomeoneElseSan', '別人さん', '別人桑'],
    },
    {
        id: 'a7c14064-ad31-46d6-8129-7a44aab098b7',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        name: 'Первопроходец',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.BACKGROUND,
        description: 'главный антагонист КтоТоЕщеСан',
        age: 35,
        date_of_birth: '1900',
        blood_type: '2',
        gender: 'male',
        synonyms: ['開拓者', '先鋒', 'Pioneer'],
    },
    {
        id: 'a836e064-0e87-4f34-aaf2-9b753717f6e2',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        name: 'Странное имя',
        importance: CharacterType.ANTAGONIST,
        role: CharacterRole.MAIN,
        description: 'главный антагонист Первопроходца',
        age: 35,
        date_of_birth: '1900',
        blood_type: '2',
        gender: 'male',
        synonyms: ['Strange name', '変な名前', '陌生的名字', 'Чудно име'],
    },
    {
        id: '0573891e-edec-492c-9793-45c04299969b',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Гинтоки Саката',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Главный протагонист Гинтамы.
            Основатель и лидер Ёрозуи, а также высококвалифицированный
            самурай, сражавшийся в войне Джои в прошлом
        `,
        age: 27,
        date_of_birth: 'Oct 10',
        blood_type: '2',
        gender: 'male',
        synonyms: ['Gintoki Sakata', '坂田銀時', 'Ginpachi-sensei', 'Ginnoji'],
    },
    {
        id: 'e75ccf37-6d74-47fa-bbf4-26093579af69',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Катару Кацура',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.SUPPORTING,
        description: `
            Спокойный, добрый, умный и образованный молодой человек,
            лидер, друг Гинтоки.
        `,
        age: 20,
        date_of_birth: 'Jun 26',
        blood_type: '3',
        gender: 'male',
        synonyms: [
            '桂小太郎',
            'Zura',
            'Fruit Punch Samurai',
            'Kotarou Katsura',
        ],
    },
    {
        id: '4a1081d4-4b62-4fcd-981d-2feb39d7aabe',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Рули Тамаки',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Очень яркая личность и очень социальная,
            также очень дружелюбна ко всем кого встретит
        `,
        age: 16,
        date_of_birth: 'May 20',
        blood_type: '1',
        gender: 'female',
        synonyms: ['珠樹るり', 'Ruri Tamaki'],
    },
    {
        id: 'eec7492e-1706-474a-980b-aaf44a8ce19d',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Мао Отоха',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Студентка высшей школы Сейрея, аватаром Мао является Хана на планете Айкацу!
        `,
        age: 17,
        date_of_birth: 'Apr 3',
        blood_type: '4',
        gender: 'female',
        synonyms: ['音羽舞桜', 'Hana (ハナ)'],
    },
    {
        id: 'ec77a84f-eda6-4072-9218-b9847f9e0f46',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Шигуре Сома',
        importance: CharacterType.OTHER,
        role: CharacterRole.SUPPORTING,
        description: `
            Кузен Юки, лучший друг Аямэ и фактический опекун Тору Хонды.
            Очень заботливый, но в то же время вечно подшучивающий
            над всеми окружающими.
        `,
        age: 26,
        date_of_birth: '',
        blood_type: '3',
        gender: 'male',
        synonyms: ['草摩紫呉', 'Shigure Souma', 'Gure', 'Shii-Chan'],
    },
    {
        id: 'd4da5105-57a6-47f6-ad12-8dd3eb29937a',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Кё Сома',
        importance: CharacterType.OTHER,
        role: CharacterRole.SUPPORTING,
        description: `
            Грубоватый в общении, но добрый парень.
            Из-за способности превращаться в кота в семье
            Сома к нему с детства питали некоторую неприязнь,
            так как кот не является животным восточного календаря.
        `,
        age: 17,
        date_of_birth: '',
        blood_type: '1',
        gender: 'male',
        synonyms: ['草摩夾', 'Kyou Souma', 'Kyonkyon'],
    },
    {
        id: '295a47fb-4c91-4da8-a91b-a4732ae3c34c',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Ай Хайбара',
        importance: CharacterType.CONFIDANTE,
        role: CharacterRole.SUPPORTING,
        description: `Бывший член «Чёрной организации», известная под кодовым именем «Херес» `,
        age: 8,
        date_of_birth: '',
        blood_type: '2',
        gender: 'female',
        synonyms: [
            '灰原哀',
            'Anita Hailey',
            'Ai Haibara',
            'The Evil-Eyed Yawny Girl',
        ],
    },
    {
        id: '84f7b15c-ec2a-4c2a-9427-92ff4b3d8ad6',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Конан Эдогава',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Главный герой, детектив-старшеклассник. Джин,
            член «Чёрной организации», заставил его принять
            наркотик «APTX-4869», который должен был его убить,
            но вместо этого тело Шиничи уменьшилось до шестилетнего
            возраста.
        `,
        age: 7,
        date_of_birth: 'May 4',
        blood_type: '2',
        gender: 'male',
        synonyms: ['Conan Edogawa', '江戸川コナン,', 'Kinichi', 'Shin-chan,'],
    },
    {
        id: '68c734e5-cfb9-43f5-93da-b201fb0c3ab1',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Ичиго Куросаки',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Главный герой аниме и манги «Блич», созданный Тайто Кубо
        `,
        age: 25,
        date_of_birth: 'Jul 15',
        blood_type: '1',
        gender: 'male',
        synonyms: ['Ichigo Kurosaki', '黒崎一護', 'Substitute Soul Reaper'],
    },
    {
        id: '04bfafc6-eb2f-4f0e-ba52-ec634efc133a',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Урю Исида',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Персонаж аниме и манги «Блич», созданный Тайто Кубо.
            Одноклассник Ичиго Куросаки, называющий себя «последним
            из квинси».
        `,
        age: 21,
        date_of_birth: 'Nov 6',
        blood_type: '3',
        gender: 'male',
        synonyms: ['Uryuu Ishida', '石田雨竜', 'Prinz von Licht'],
    },
    {
        id: '9020b9e1-82de-4357-9ea2-0e0f36803392',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Сюн Футами',
        importance: CharacterType.SIDEKICK,
        role: CharacterRole.BACKGROUND,
        description: `
            Персонаж аниме и манги «Играйте круто, ребята!».
        `,
        age: 17,
        date_of_birth: 'Jul 7',
        blood_type: '3',
        gender: 'male',
        synonyms: ['Shun Futami', '二見瞬 '],
    },
    {
        id: 'ec280d18-f4db-42e9-987d-b3fa749e844e',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Хаятэ Итикура',
        importance: CharacterType.EXTRAS,
        role: CharacterRole.SUPPORTING,
        description: `
            Персонаж аниме и манги «Играйте круто, ребята!».
            Студент первокурсник, любит гулять один.
        `,
        age: 20,
        date_of_birth: 'Apr 24',
        blood_type: '1',
        gender: 'male',
        synonyms: ['Hayate Ichikura', '一倉 颯'],
    },
    {
        id: '22a74e6c-65db-4b66-9a2c-4f166b5490da',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Киллуа Золдик',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Один из главных персонажей манги и аниме Hunter Х Hunter.
            Наследник знаменитого клана убийц Золдиков,
            который хочет найти друзей, а не наследовать семейное дело.
        `,
        age: 15,
        date_of_birth: 'Jul 7',
        blood_type: '1',
        gender: 'male',
        synonyms: ['Killua Zoldyck', 'キルア=ゾルディック'],
    },
    {
        id: 'ffb2654c-058b-4ed9-bcb0-3299c9752543',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Гон Фрикс',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Один из главных персонажей манги и аниме Hunter Х Hunter.
            Живёт со своей тётей Мито и бабушкой на Китовом острове.
        `,
        age: 15,
        date_of_birth: 'May 5',
        blood_type: '2',
        gender: 'male',
        synonyms: ['Gon Freecss', 'ゴン＝フリークス '],
    },
    {
        id: 'c96d9432-bd32-450d-94ec-5d890f30c0e4',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Рафал',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Один из главных персонажей манги и будущего аниме "О движении Земли'
        `,
        age: 12,
        date_of_birth: '',
        blood_type: '3',
        gender: 'male',
        synonyms: ['Rafał', 'ラファウ'],
    },
    {
        id: 'a34303be-e696-49b4-831b-d5541b6d5747',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Баденай',
        importance: CharacterType.ANTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Один из главных антоганистов манги и будущего аниме "О движении Земли'
        `,
        age: 21,
        date_of_birth: '',
        blood_type: '1',
        gender: 'male',
        synonyms: ['Badeni', 'バデーニ'],
    },
    {
        id: '985e8f32-37e8-4a69-b849-daaa6c86f9d3',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Михо Нишизуми',
        importance: CharacterType.EXTRAS,
        role: CharacterRole.SUPPORTING,
        description: `
            Дочь Шихо Нишизуми и младшая сестра Махо Нишизуми,
            Михо второкурсница девичьей академии.
        `,
        age: 18,
        date_of_birth: 'Oct 23',
        blood_type: '1',
        gender: 'female',
        synonyms: ['Miho Nishizumi', '西住みほ'],
    },
    {
        id: '03b7d2b8-8ab4-425d-8b9c-1480de602800',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Саори Такэбэ',
        importance: CharacterType.CONFIDANTE,
        role: CharacterRole.SUPPORTING,
        description: `
            Девочка с немного вьющимися светло-рыжими волосами до лопаток
            и светло-карими глазами. Ищет красивого парня,
            но безуспешно.
        `,
        age: 17,
        date_of_birth: 'Jun 22',
        blood_type: '4',
        gender: 'female',
        synonyms: ['Saori Takebe', '武部沙織'],
    },
    {
        id: 'acdddc06-68cc-4765-a88d-a3f852738569',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Блейд',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Главный герой будущего аниме "Класс для героев".
        `,
        age: 17,
        date_of_birth: '',
        blood_type: '2',
        gender: 'male',
        synonyms: ['Blade', 'ブレイド '],
    },
    {
        id: '6b2c741d-ed72-4c38-a0f6-53c9f0f69daf',
        bucket_id: '101e0e6d-cd65-445a-8d46-ca1b9d281fb7',
        name: 'Арнест Флейминг',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: `
            Главный герой будущего аниме "Класс для героев".
            Привлекательная, молодая девушка с красными глазами
            и длинными волосами.
        `,
        age: 18,
        date_of_birth: '',
        blood_type: '3',
        gender: 'female',
        synonyms: ['Arnest Flaming', 'アーネスト・フレイミング'],
    },
];
