import { PrismaClient } from '@prisma/client';
import {
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../common/models/enums';

const prisma = new PrismaClient();

export const animeData = async () => {
    const genreList = await prisma.genre.findMany();
    const authorList = await prisma.author.findMany();
    const characterList = await prisma.character.findMany();
    if (!genreList.length || !authorList.length || !characterList.length) {
        throw new Error(
            'Genre, author or character table is empty or not available',
        );
    }
    return [
        {
            id: '1484d58b-bd26-4fed-99a0-d0ba53da3827',
            title: 'Гуррен-лаганн',
            country_of_origin: 'JP',
            score: 4.7,
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            year: 2010,
            date_start: new Date('2010-10-14'),
            date_end: new Date('2010-12-22'),
            genres: {
                connect: [
                    {
                        id: '4f02be8b-cafb-4f1d-baa8-c34279b1def1',
                    },
                ],
            },
            format: MediaFormat.OTHER,
            source: MediaSource.OTHER,
            hashtags: ['#GurrenLagann', '#グレンラガン'],
            synonyms: [
                'Tengen Toppa Gurren Lagann',
                'TTGL',
                '天元突破グレンラガン',
            ],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
                    },
                ],
            },
            seasons_count: 3,
            episodes: 6,
            duration: 13000,
            next_episode: new Date('2023-8-19 10:23:54'),
            rating: FilmRating.R,
            description: 'аниме про лагман',
            preview_link: 'https://google.com',
            status_description: 'в 2006-2007гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: '08bee141-9254-4fa5-a5dd-7eb2f4f7bff9',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: '1347a799-c5e1-4326-9bec-f6eb5e6e087e',
                    },
                    {
                        id: '3027030a-65ee-45c3-9c1b-2dae2444a5e9',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: 'f2d82632-d15d-496f-a45b-dd57b1297f6e',
            title: 'Стальной алхимик',
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            country_of_origin: 'JP',
            score: 6.9,
            year: 1999,
            date_start: new Date('2003-04-21'),
            date_end: new Date('2004-05-18'),
            genres: {
                connect: [
                    {
                        id: '48c8e29c-c942-4c15-a3e3-0fed7a0a8cb8',
                    },
                    {
                        id: 'cab8c75f-9544-41fc-a042-f2909bd9be32',
                    },
                ],
            },
            format: MediaFormat.MOVIE,
            source: MediaSource.GAME,
            hashtags: ['#SteelAlchemist', '#鋼鐵煉金術士'],
            synonyms: ['Steel Alchemist', '鋼の錬金術師', 'ຊ່າງກົນຈັກເຫຼັກ'],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
                    },
                ],
            },
            seasons_count: 1,
            episodes: 10,
            duration: 22000,
            next_episode: new Date('2023-9-19 10:23:54'),
            rating: FilmRating.R,
            description: 'про малыша в доспехах',
            preview_link: 'https://yandex.com',
            status_description: 'в 1999-2001 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: '07730046-340c-4052-9a38-853216c283be',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: '996e603b-d3dc-4fd8-b6fe-f5e2837168e5',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: '1033dd1c-2401-402a-afd2-858e78eb7475',
            title: 'Стальной охотник',
            country_of_origin: 'JP',
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            score: 9.1,
            year: 2016,
            date_start: new Date('2016-06-15'),
            date_end: new Date('2017-01-21'),
            genres: {
                connect: [
                    {
                        id: 'c71ec9c1-ee65-4412-a89b-529ae69dca99',
                    },
                    {
                        id: '050a2fb2-667c-4048-8cdf-aa1181e98fa4',
                    },
                    {
                        id: 'c2c51789-bbff-490b-a817-31665c905ea7',
                    },
                ],
            },
            format: MediaFormat.SPECIAL,
            source: MediaSource.LIGHT_NOVEL,
            hashtags: ['#SteelHunter', '#スチールハンター'],
            synonyms: ['Steel Hunter', 'Çelik Avcısı', 'Plieno medžiotojas'],
            is_licensed: false,
            studios: {
                connect: [
                    {
                        id: '9acd2bf7-6fcf-4648-bd03-5e6dbf68a244',
                    },
                ],
            },
            seasons_count: 1,
            episodes: 10,
            duration: 12075,
            next_episode: new Date('2023-10-19 10:23:54'),
            rating: FilmRating.R,
            description: 'про охотника',
            preview_link: 'https://icloud.com',
            status_description: 'в 2015-2016 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: 'a7c14064-ad31-46d6-8129-7a44aab098b7',
                    },
                    {
                        id: 'a836e064-0e87-4f34-aaf2-9b753717f6e2',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: '43580db0-1e6f-463d-82d5-883aeae2457f',
                    },
                    {
                        id: 'ea5a020b-40ad-402a-8215-e9050a817b64',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: 'dbabc664-de8d-4e25-a72d-ae421cac0786',
            title: 'Гинтама',
            score: 9.0,
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            year: 2015,
            date_start: new Date('2015-05-08'),
            date_end: new Date('2016-03-30'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '893a0480-3c72-415e-9c45-da1d540bc440',
                    },
                    {
                        id: '29873f37-d33e-43e3-9841-71447b4cbf47',
                    },
                    {
                        id: '48c8e29c-c942-4c15-a3e3-0fed7a0a8cb8',
                    },
                ],
            },
            format: MediaFormat.TV,
            source: MediaSource.MANGA,
            season: YearSeason.SPRING,
            hashtags: ['#гинтама'],
            synonyms: ['Gintama', '銀魂', '은혼', '銀魂', 'กินทามะ'],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: '48117d7a-5946-4940-937c-d733d8d46e3f', //Bandai Namco Pictures!!!
                    },
                ],
            },
            seasons_count: 8,
            episodes: 51,
            duration: 73440,
            next_episode: new Date('2016-03-30'),
            rating: FilmRating.PG_13,
            description:
                'Четвёртый сезон всё также рассказывает о бесстрашном самурае и его товарищах. ' +
                'За свою деятельность в качестве членов организации «Мастера», они действительно сдружились, ' +
                'и смогли наладить командную работу. Постоянные трудности, необычные просьбы клиентов, ' +
                'а также таинственные места ждут главного героя. И он всё также не теряет в уверенности ' +
                'в своих силах. Тем более, что намечаются изменения с пришельцами. Они уже не могут всё контролировать как раньше ' +
                'а значит это шанс найти способ полностью изгнать их с Земли. Всё же Гинтама и остальные сосредоточены на другом, ' +
                'ведь всё также им предстоит встреча с неизвестными личностями и опасностями.',
            preview_link: 'https://gintama.com',
            status_description: 'в 2015-2016 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: '0573891e-edec-492c-9793-45c04299969b',
                    },
                    {
                        id: 'e75ccf37-6d74-47fa-bbf4-26093579af69',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: '4bc5062e-b024-4477-84cc-59f4ac203b11',
                    },
                    {
                        id: '74f44b75-75e5-4922-a5ba-4c1fd4d614f6',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: 'b7e9104f-9453-4414-8d23-0bd7e3a33d53',
            title: 'Планета Айкацу!',
            score: 6.0,
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            year: 2021,
            date_start: new Date('2021-01-10'),
            date_end: new Date('2021-06-27'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '60f525ad-0afc-4a68-b38f-4ef0dae5ef53',
                    },
                ],
            },
            format: MediaFormat.TV,
            source: MediaSource.ORIGINAL,
            season: YearSeason.WINTER,
            hashtags: ['#アイカツプラネット, #aikatsuplanet'],
            synonyms: [
                'Aikatsu Planet!',
                'アイカツプラネット！',
                '合勝星球！',
                '아이카츠 플래닛!',
            ],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: '48117d7a-5946-4940-937c-d733d8d46e3f', // Bandai Namco Pictures!!!
                    },
                ],
            },
            seasons_count: 1,
            episodes: 25,
            duration: 36000,
            next_episode: new Date('2021-06-27'),
            rating: FilmRating.G,
            description:
                'Гибридный лайв-экшн-аниме-CG проект. История вращается вокруг «Планеты Айкацу», мира, ' +
                'где каждый может взять на себя роль аватара и стать очаровательно милым кумиром. ' +
                'Мао Отоха, обычная первокурсница частной средней школы Сэйрэй, становится идолом №1 Хана, ' +
                'когда предыдущее альтер-эго Ханы Мэйса Хината внезапно исчезла.',
            preview_link: 'https://aikatsu-planet.com',
            status_description: 'в 2021-2021 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: '4a1081d4-4b62-4fcd-981d-2feb39d7aabe',
                    },
                    {
                        id: 'eec7492e-1706-474a-980b-aaf44a8ce19d',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: 'f505131e-4d9f-4e3c-a3a0-cb5b2751fc9d',
                    },
                    {
                        id: 'c8d6cd01-a845-41b7-878d-f495809fc36f',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: 'f18fb48b-d9f9-4aeb-b3d4-b6732d6b50aa',
            title: 'Корзина фруктов: Финал',
            score: 9.0,
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            year: 2021,
            date_start: new Date('2021-04-06'),
            date_end: new Date('2021-06-29'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '29873f37-d33e-43e3-9841-71447b4cbf47',
                    },
                    {
                        id: '48c8e29c-c942-4c15-a3e3-0fed7a0a8cb8',
                    },
                ],
            },
            format: MediaFormat.TV,
            source: MediaSource.MANGA,
            season: YearSeason.SPRING,
            hashtags: ['#フルーツバスケット', '#フルバ', '#fruba', '#furuba'],
            synonyms: [
                'Furuba',
                'Fruba',
                'フルバ',
                'Fruits Basket Season 3',
                '水果篮子 最终季',
                'เสน่ห์สาวข้าวปั้น ภาค 3',
                'เสน่ห์สาวข้าวปั้น ภาคสุดท้าย',
            ],
            is_licensed: false,
            studios: {
                connect: [
                    {
                        id: 'bfa55967-e6dc-4a22-a763-acf08b9a8ae1', // TMS Entertainment !!!
                    },
                ],
            },
            seasons_count: 3,
            episodes: 13,
            duration: 18720,
            next_episode: new Date('2021-06-29'),
            rating: FilmRating.NC_21,
            description:
                'Сотни лет назад китайские духи Зодиака и их бог поклялись вечно оставаться вместе. ' +
                'Объединенные этим обещанием, одержимые члены семьи Сома должны всегда и при любых обстоятельствах возвращаться друг к другу. ' +
                'Однако, когда эти узы сковывают их свободу, это становится нежелательным бременем — проклятием. ',
            preview_link: 'https://fruits-basket.com',
            status_description: 'в 2021-2021 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: 'ec77a84f-eda6-4072-9218-b9847f9e0f46',
                    },
                    {
                        id: 'd4da5105-57a6-47f6-ad12-8dd3eb29937a',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: '225662ac-0888-4bf1-a252-2e53b41e446c',
                    },
                    {
                        id: '3f2fb7e6-6f94-40bc-ab31-f8d90a0df134',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: '5318851d-3348-4cf7-81a9-b08ccf505796',
            title: 'Детектив Конан: Черная железная рыба-тень',
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            score: 0,
            year: 2023,
            date_start: new Date('2023-04-14'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '48c8e29c-c942-4c15-a3e3-0fed7a0a8cb8',
                    },
                    {
                        id: 'bde686dd-1719-4597-ad50-8378d00de146',
                    },
                ],
            },
            format: MediaFormat.MOVIE,
            source: MediaSource.ORIGINAL,
            season: YearSeason.SPRING,
            hashtags: ['#劇場版名探偵コナン', '#黒鉄の魚影'],
            synonyms: [
                'Detective Conan 2023',
                '名探偵コナン2023',
                'Detective Conan Movie 26',
                '名探偵コナン 黒鉄の魚影（サブマリン',
                'Meitantei Conan: Kurogane no Gyoei',
            ],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: 'bfa55967-e6dc-4a22-a763-acf08b9a8ae1', // TMS Entertainment!!!
                    },
                ],
            },
            seasons_count: 26,
            episodes: 1,
            duration: 0,
            next_episode: new Date('2023-12-31'),
            rating: FilmRating.NC_17,
            description: `26-ой фильм о детективе Конане. Премьера состоится во время золотой недели 2023`,
            preview_link: 'https://konan-detective.com',
            status_description: 'в 2023-2023 гг',
            release_status: ReleaseStatus.NOT_YET_RELEASED,
            characters: {
                connect: [
                    {
                        id: '295a47fb-4c91-4da8-a91b-a4732ae3c34c',
                    },
                    {
                        id: '84f7b15c-ec2a-4c2a-9427-92ff4b3d8ad6',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: '6e190a1c-3dd4-4140-91ce-5d706e20c00b',
                    },
                    {
                        id: 'c287a823-3976-467e-a093-9d7b9f65c544',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: '3d782894-102b-4ab2-94be-0438b5fa99a9',
            title: 'БЛИЧ: кровавая война тысячелетия',
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            score: 8.9,
            year: 2022,
            date_start: new Date('2022-10-11'),
            date_end: new Date('2022-12-27'),
            country_of_origin: 'CH',
            genres: {
                connect: [
                    {
                        id: '893a0480-3c72-415e-9c45-da1d540bc440',
                    },
                    {
                        id: 'bde686dd-1719-4597-ad50-8378d00de146',
                    },
                ],
            },
            format: MediaFormat.TV,
            source: MediaSource.MANGA,
            season: YearSeason.FALL,
            hashtags: ['#BLEACH_anime', '#BLEACHTYBW'],
            synonyms: [
                'Bleach: La guerre sanglante de mille ans',
                'بليتش: حرب الألف سنة الدموية',
            ],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: '0a0beac9-7395-4383-b894-b55f7263824e', //Studio Pierrot!!!
                    },
                ],
            },
            seasons_count: 16,
            episodes: 13,
            duration: 23040,
            next_episode: new Date('2022-12-27'),
            rating: FilmRating.NC_21,
            description:
                'Во главе с Яхве, отцом всех квинси, который был запечатан много лет, ' +
                '«Ванденрейх» объявляет войну всем синигами и грозится через пять дней стереть Сообщество душ в порошок. ' +
                'Ичиго Куросаки, временно исполняющему обязанности синигами, предстоит вновь взять в руки меч и стать на ' +
                'защиту мира людей и Сообщества душ.',
            preview_link: 'https://bleach.com',
            status_description: 'в 2022-2022 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: '68c734e5-cfb9-43f5-93da-b201fb0c3ab1',
                    },
                    {
                        id: '04bfafc6-eb2f-4f0e-ba52-ec634efc133a',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: '60c1958e-9938-4ddd-b515-1ada1961ae0d',
                    },
                    {
                        id: '6a6d7780-a4f8-43da-8a6b-50ba6befff11',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: 'f4b8318d-55c0-4b84-a83e-42560006801d',
            title: 'Играйте круто, ребята!',
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            score: 7.4,
            year: 2022,
            date_start: new Date('2022-10-11'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '60f525ad-0afc-4a68-b38f-4ef0dae5ef53',
                    },
                    {
                        id: '29873f37-d33e-43e3-9841-71447b4cbf47',
                    },
                ],
            },
            format: MediaFormat.TV_SHORT,
            source: MediaSource.MANGA,
            season: YearSeason.FALL,
            hashtags: ['#クールドジ男子'],
            synonyms: [
                'クールドジ男子',
                'Cool Doji Danshi',
                '쿨하게 플레이하세요, 여러분',
                'Spielen Sie es cool, Jungs',
            ],
            is_licensed: false,
            studios: {
                connect: [
                    {
                        id: '0a0beac9-7395-4383-b894-b55f7263824e', //Studio Pierrot!!!
                    },
                ],
            },
            seasons_count: 1,
            episodes: 24,
            duration: 15840,
            next_episode: new Date('2023-01-23 21:30'),
            rating: FilmRating.PG,
            description:
                'Мужественность — неотъемлемая часть представителей сильного пола. ' +
                'Однако не только мужественность определяет парней, не стоит забывать и о целеустремлённости, ' +
                'смелости, трудолюбии и способности не ударить в грязь лицом. Следует также отметить, что мужчины ' +
                'обладают и иными чертами, которые обычно приписывают прекрасному полу. ' +
                'Парни тоже бывают милыми, чувствительными и неуклюжими.',
            preview_link: 'https://play-cool.com',
            status_description: 'в 2022-2023 гг',
            release_status: ReleaseStatus.RELEASING,
            characters: {
                connect: [
                    {
                        id: '9020b9e1-82de-4357-9ea2-0e0f36803392',
                    },
                    {
                        id: 'ec280d18-f4db-42e9-987d-b3fa749e844e',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: 'e688bb57-ecdf-416a-957d-b8d8c5b57a5d',
                    },
                    {
                        id: 'f2e513e0-ef4a-4d67-8119-c734c9df9b75',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: '9a189481-ba95-4091-a6e9-95ae42319ee2',
            title: 'Хантер X Хантер',
            score: 8.9,
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            year: 2011,
            date_start: new Date('2011-10-02'),
            date_end: new Date('2014-09-24'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '893a0480-3c72-415e-9c45-da1d540bc440',
                    },
                    {
                        id: '29873f37-d33e-43e3-9841-71447b4cbf47',
                    },
                    {
                        id: '48c8e29c-c942-4c15-a3e3-0fed7a0a8cb8',
                    },
                ],
            },
            format: MediaFormat.TV,
            source: MediaSource.MANGA,
            season: YearSeason.FALL,
            hashtags: ['#ハンター'],
            synonyms: [
                'ハンター×ハンター',
                'HxH',
                '全职猎人',
                'האנטר האנטר',
                'ฮันเตอร์ x ฮันเตอร์',
                'القناص',
            ],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: 'e34522f4-6656-4d97-a0f5-728089494bef', // MADHOUSE !!!
                    },
                ],
            },
            seasons_count: 3,
            episodes: 148,
            duration: 213120,
            next_episode: new Date('2014-09-24'),
            rating: FilmRating.R,
            description:
                'Главный герой, Гон Фрикс, отправляется на экзамен с целью стать Охотником и найти своего отца. ' +
                'Ему предстоит преодолеть много трудностей на своем пути и встретить замечательных друзей, ' +
                'у каждого из которых свои причины стать Охотником.',
            preview_link: 'https://HUNTERXHUNTER.com',
            status_description: 'в 2011-2014 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: '22a74e6c-65db-4b66-9a2c-4f166b5490da',
                    },
                    {
                        id: 'ffb2654c-058b-4ed9-bcb0-3299c9752543',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: '369f1fc2-e1b8-4448-82d5-24099f80eb4d',
                    },
                    {
                        id: 'cb6faea1-d7d8-4a5e-bdcb-8fec9daa9587',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: 'eef70dab-1363-4b4b-99cb-574655321b28',
            title: 'Чи: О движении Земли',
            score: 0,
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            year: 2023,
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '48c8e29c-c942-4c15-a3e3-0fed7a0a8cb8',
                    },
                ],
            },
            format: MediaFormat.OTHER,
            source: MediaSource.MANGA,
            hashtags: ['#アニメのチ'],
            synonyms: [
                'Chi: About the Movement of the Earth',
                'สุริยะปราชญ์ ทฤษฎีสีเลือด',
            ],
            is_licensed: false,
            studios: {
                connect: [
                    {
                        id: 'e34522f4-6656-4d97-a0f5-728089494bef', // MADHOUSE !!!
                    },
                ],
            },
            seasons_count: 1,
            episodes: 1,
            duration: 0,
            next_episode: new Date('2023-12-31'),
            rating: FilmRating.PG,
            description:
                'Польша, XV-й век. Времена, когда за еретические идеи сжигали на костре. ' +
                'Рафал — вундеркинд, интересующийся теологией, самым важным в те времена предметом, ' +
                'и собирающийся поступать в университет по этому направлению. ' +
                'По стечению обстоятельств он однажды встречает таинственного человека ' +
                'и открывает для себя возможную «истину» среди тумана инакомыслия ',
            preview_link: 'https://Chi-about.com',
            status_description: 'в 2023-2024 гг',
            release_status: ReleaseStatus.NOT_YET_RELEASED,
            characters: {
                connect: [
                    {
                        id: 'c96d9432-bd32-450d-94ec-5d890f30c0e4',
                    },
                    {
                        id: 'a34303be-e696-49b4-831b-d5541b6d5747',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: 'e602ecea-435c-4419-9f50-890d3faaf808',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: '7ee28cb7-f911-4578-ae15-9981091ae47f',
            title: 'Девушки и танки',
            score: 7.3,
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            year: 2012,
            date_start: new Date('2012-10-09'),
            date_end: new Date('2013-03-25'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '893a0480-3c72-415e-9c45-da1d540bc440',
                    },
                    {
                        id: '29873f37-d33e-43e3-9841-71447b4cbf47',
                    },
                ],
            },
            format: MediaFormat.TV,
            source: MediaSource.ORIGINAL,
            season: YearSeason.FALL,
            hashtags: ['#garupan'],
            synonyms: ['Garupan', '少女与战车'],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: '2a968ac7-b82a-41ce-beb6-25f790a4b31b', //Actas  !!!
                    },
                ],
            },
            seasons_count: 1,
            episodes: 12,
            duration: 288,
            next_episode: new Date('2013-03-25'),
            rating: FilmRating.PG_13,
            description:
                'Семья Михо Нисидзуми много поколений пилотирует танки, а вот самой ей это не особо нравится. ' +
                'Именно поэтому Михо пошла учиться в Академию Оарай, где не было подобных занятий. ' +
                'Но теперь всё изменилось, и студсовет принуждает нашу малышку вступить на танковый факультатив, ' +
                'чтобы Оарай могли участвовать в ежегодном турнире Сэнся-до. А ведь у неё только наконец ' +
                'появились подруги! Но они-то не против, даже наоборот.',
            preview_link: 'https://girls-and-panzer.com',
            status_description: 'в 2012-2013 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: '985e8f32-37e8-4a69-b849-daaa6c86f9d3',
                    },
                    {
                        id: '03b7d2b8-8ab4-425d-8b9c-1480de602800',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: 'd4e62fc0-ff58-4e52-adea-b649ac4185ca',
                    },
                    {
                        id: 'bc9ee071-5935-4d1f-a99f-9f2c1a0646e3',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: '8a1d7510-f7fb-4656-a38d-f06239d57cfe',
            title: 'Класс для героев',
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            score: 0,
            year: 2023,
            date_start: new Date('2023-12-31'),
            country_of_origin: 'CH',
            genres: {
                connect: [
                    {
                        id: '893a0480-3c72-415e-9c45-da1d540bc440',
                    },
                    {
                        id: '4f02be8b-cafb-4f1d-baa8-c34279b1def1',
                    },
                ],
            },
            format: MediaFormat.TV,
            source: MediaSource.LIGHT_NOVEL,
            hashtags: ['#英雄教室', '#eiyu_anime'],
            synonyms: [
                '영웅을 위한 교실',
                'Klassenzimmer für Helden',
                'Classroom for Heroes',
            ],
            is_licensed: false,
            studios: {
                connect: [
                    {
                        id: '2a968ac7-b82a-41ce-beb6-25f790a4b31b', //Actas  !!!
                    },
                ],
            },
            seasons_count: 1,
            episodes: 1,
            duration: 0,
            next_episode: new Date('2023-12-31'),
            rating: FilmRating.NC_21,
            description:
                'Оказывается герои, одолевшие короля демонов, могут быть знамениты не только этим. ' +
                'Например, один такой герой взял и создал специальную академию, которая смогла бы ' +
                'воспитать ему достойную смену. Одной из лучших учениц академии стала Арнест Флейминг, ' +
                'которая за свои успехи в управлении огнём, получила прозвище Императрица Пламени.',
            preview_link: 'https://class-for-heroes.com',
            status_description: 'в 2023-2023 гг',
            release_status: ReleaseStatus.NOT_YET_RELEASED,
            characters: {
                connect: [
                    {
                        id: 'acdddc06-68cc-4765-a88d-a3f852738569',
                    },
                    {
                        id: '6b2c741d-ed72-4c38-a0f6-53c9f0f69daf',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: 'a22c040f-c228-43e0-a628-35e82ed293d3',
                    },
                    {
                        id: '75f855d1-9148-434c-8552-07fdb1c277a4',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
        },
        {
            id: '02bfd954-3cf5-47a1-953b-daad7054c6d6',
            title: 'Невероятные преключеия Джо Джо(Reference)',
            score: 5,
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            year: 2012,
            date_start: new Date('2012-12-31'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: '893a0480-3c72-415e-9c45-da1d540bc440',
                    },
                    {
                        id: '4f02be8b-cafb-4f1d-baa8-c34279b1def1',
                    },
                ],
            },
            format: MediaFormat.TV,
            source: MediaSource.MANGA,
            hashtags: ['#ジョジョの奇妙な冒険', '#jojo_anime'],
            synonyms: [
                'ジョジョの奇妙な冒険',
                'JoJo Bizarres Abenteuer',
                'JoJo Bizarre Adventure',
            ],
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: '2a968ac7-b82a-41ce-beb6-25f790a4b31b',
                    },
                ],
            },
            seasons_count: 6,
            episodes: 50,
            duration: 0,
            next_episode: new Date('2023-12-31'),
            rating: FilmRating.NC_17,
            description:
                'Надоело аниме с кошкодевочками и хочется чего то брутального ? ' +
                'Это самое брутальное аниме про накаченых мужиков, тут нет места кошачьим ушкам и милым хвостакам. ' +
                'Война за право быть на вершине, только мощь, только грубая сила! ',
            preview_link: 'https://jojo.fandom.com',
            status_description: 'в 2012-2023 гг',
            release_status: ReleaseStatus.RELEASING,
            characters: {
                connect: [
                    {
                        id: 'acdddc06-68cc-4765-a88d-a3f852738569',
                    },
                    {
                        id: '6b2c741d-ed72-4c38-a0f6-53c9f0f69daf',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: 'a22c040f-c228-43e0-a628-35e82ed293d3',
                    },
                    {
                        id: '75f855d1-9148-434c-8552-07fdb1c277a4',
                    },
                ],
            },
            airing_schedule: {
                connect: []
            },
            opening_ending: {
                connect: [
                    // {   
                    //     id: '51630f1a-32d8-4e23-ace2-66ba69a4878a',
                    // },
                    // {   
                    //     id: '7362f7d3-7c4b-4f78-ab54-9a4b8462773b',
                    // }
                ]
            },
        },
        {
            id: "59b92892-1258-43a9-8d68-3db4f3b076b5",
            title: "Евангелион",
            evaluation: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            score: 12,
            year: 25,
            country_of_origin: "jp",
            date_start: "2022-10-11T00:00:00.000Z",
            date_end: "2022-10-11T00:00:00.000Z",
            seasons_count: 1,
            format: MediaFormat.TV,
            source: MediaSource.MANGA,
            rating: FilmRating.NC_17,
            characters: {
                connect: [
                    {
                        id: 'acdddc06-68cc-4765-a88d-a3f852738569',
                    },
                    {
                        id: '6b2c741d-ed72-4c38-a0f6-53c9f0f69daf',
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: 'a22c040f-c228-43e0-a628-35e82ed293d3',
                    },
                    {
                        id: '75f855d1-9148-434c-8552-07fdb1c277a4',
                    },
                ],
            },
            episodes: 1,
            duration: 1,
            next_episode: "2022-10-11T00:00:00.000Z",
            description: "Насилие и жестокоть в вашем вкусе? Тогда смотрите с удовольствием, это аниме для детей с аутизмом и шизофренией :)",
            preview_link: "ok.ru",
            status_description: "string",
            is_licensed: true,
            hashtags: [],
            synonyms: [],
            release_status: ReleaseStatus.COMPLETED,
        }
    ];
};
