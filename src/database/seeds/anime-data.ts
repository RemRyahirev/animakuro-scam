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
            year: 2010,
            date_start: new Date('2010-10-14'),
            date_end: new Date('2010-12-22'),
            genres: {
                connect: [
                    {
                        id: genreList[0].id,
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
                        id: characterList[0].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[0].id,
                    },
                    {
                        id: authorList[1].id,
                    },
                ],
            },
        },
        {
            id: 'f2d82632-d15d-496f-a45b-dd57b1297f6e',
            title: 'Стальной алхимик',
            country_of_origin: 'JP',
            score: 6.9,
            year: 1999,
            date_start: new Date('2003-04-21'),
            date_end: new Date('2004-05-18'),
            genres: {
                connect: [
                    {
                        id: genreList[1].id,
                    },
                    {
                        id: genreList[2].id,
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
                        id: characterList[1].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[2].id,
                    },
                ],
            },
        },
        {
            id: '1033dd1c-2401-402a-afd2-858e78eb7475',
            title: 'Стальной охотник',
            country_of_origin: 'JP',
            score: 9.1,
            year: 2016,
            date_start: new Date('2016-06-15'),
            date_end: new Date('2017-01-21'),
            genres: {
                connect: [
                    {
                        id: genreList[3].id,
                    },
                    {
                        id: genreList[4].id,
                    },
                    {
                        id: genreList[5].id,
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
                        id: characterList[3].id,
                    },
                    {
                        id: characterList[4].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[3].id,
                    },
                    {
                        id: authorList[4].id,
                    },
                ],
            },
        },
        {
            id: 'dbabc664-de8d-4e25-a72d-ae421cac0786',
            title: 'Гинтама',
            score: 9.0,
            year: 2015,
            date_start: new Date('2015-05-08'),
            date_end: new Date('2016-03-30'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: genreList[6].id,
                    },
                    {
                        id: genreList[7].id,
                    },
                    {
                        id: genreList[1].id,
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
            description: `
                Четвёртый сезон всё также рассказывает о бесстрашном самурае и его товарищах.
                За свою деятельность в качестве членов организации «Мастера», они действительно сдружились, 
                и смогли наладить командную работу. Постоянные трудности, необычные просьбы клиентов, 
                а также таинственные места ждут главного героя. И он всё также не теряет в уверенности в своих силах. 
                Тем более, что намечаются изменения с пришельцами. Они уже не могут всё контролировать как раньше, 
                а значит это шанс найти способ полностью изгнать их с Земли. Всё же Гинтама и остальные сосредоточены на другом, 
                ведь всё также им предстоит встреча с неизвестными личностями и опасностями.
            `,
            preview_link: 'https://gintama.com',
            status_description: 'в 2015-2016 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[5].id,
                    },
                    {
                        id: characterList[6].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[5].id,
                    },
                    {
                        id: authorList[6].id,
                    },
                ],
            },
        },
        {
            id: 'b7e9104f-9453-4414-8d23-0bd7e3a33d53',
            title: 'Планета Айкацу!',
            score: 6.0,
            year: 2021,
            date_start: new Date('2021-01-10'),
            date_end: new Date('2021-06-27'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: genreList[8].id,
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
            description: `
                Гибридный лайв-экшн-аниме-CG проект. История вращается вокруг «Планеты Айкацу», мира, 
                где каждый может взять на себя роль аватара и стать очаровательно милым кумиром. 
                Мао Отоха, обычная первокурсница частной средней школы Сэйрэй, становится идолом №1 Хана, 
                когда предыдущее альтер-эго Ханы Мэйса Хината внезапно исчезла.
            `,
            preview_link: 'https://aikatsu-planet.com',
            status_description: 'в 2021-2021 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[7].id,
                    },
                    {
                        id: characterList[8].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[7].id,
                    },
                    {
                        id: authorList[8].id,
                    },
                ],
            },
        },
        {
            id: 'f18fb48b-d9f9-4aeb-b3d4-b6732d6b50aa',
            title: 'Корзина фруктов: Финал',
            score: 9.0,
            year: 2021,
            date_start: new Date('2021-04-06'),
            date_end: new Date('2021-06-29'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: genreList[7].id,
                    },
                    {
                        id: genreList[1].id,
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
            description: `
                Сотни лет назад китайские духи Зодиака и их бог поклялись вечно оставаться вместе. 
                Объединенные этим обещанием, одержимые члены семьи Сома должны всегда и при любых обстоятельствах возвращаться друг к другу. 
                Однако, когда эти узы сковывают их свободу, это становится нежелательным бременем — проклятием.
            `,
            preview_link: 'https://fruits-basket.com',
            status_description: 'в 2021-2021 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[9].id,
                    },
                    {
                        id: characterList[10].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[9].id,
                    },
                    {
                        id: authorList[10].id,
                    },
                ],
            },
        },
        {
            id: '5318851d-3348-4cf7-81a9-b08ccf505796',
            title: 'Детектив Конан: Черная железная рыба-тень',
            score: 0,
            year: 2023,
            date_start: new Date('2023-04-14'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: genreList[1].id,
                    },
                    {
                        id: genreList[9].id,
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
                        id: characterList[11].id,
                    },
                    {
                        id: characterList[12].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[11].id,
                    },
                    {
                        id: authorList[12].id,
                    },
                ],
            },
        },
        {
            id: '3d782894-102b-4ab2-94be-0438b5fa99a9',
            title: 'БЛИЧ: кровавая война тысячелетия',
            score: 8.9,
            year: 2022,
            date_start: new Date('2022-10-11'),
            date_end: new Date('2022-12-27'),
            country_of_origin: 'CH',
            genres: {
                connect: [
                    {
                        id: genreList[6].id,
                    },
                    {
                        id: genreList[9].id,
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
            description: `
                Во главе с Яхве, отцом всех квинси, который был запечатан много лет,
                «Ванденрейх» объявляет войну всем синигами и грозится через пять дней стереть Сообщество душ в порошок.
                Ичиго Куросаки, временно исполняющему обязанности синигами, предстоит вновь взять в руки меч и стать на
                защиту мира людей и Сообщества душ.
            `,
            preview_link: 'https://bleach.com',
            status_description: 'в 2022-2022 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[13].id,
                    },
                    {
                        id: characterList[14].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[13].id,
                    },
                    {
                        id: authorList[14].id,
                    },
                ],
            },
        },
        {
            id: 'f4b8318d-55c0-4b84-a83e-42560006801d',
            title: 'Играйте круто, ребята!',
            score: 7.4,
            year: 2022,
            date_start: new Date('2022-10-11'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: genreList[8].id,
                    },
                    {
                        id: genreList[7].id,
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
            description: `
                Мужественность — неотъемлемая часть представителей сильного пола. 
                Однако не только мужественность определяет парней, не стоит забывать и о целеустремлённости, 
                смелости, трудолюбии и способности не ударить в грязь лицом. Следует также отметить, что мужчины 
                обладают и иными чертами, которые обычно приписывают прекрасному полу. 
                Парни тоже бывают милыми, чувствительными и неуклюжими.
            `,
            preview_link: 'https://play-cool.com',
            status_description: 'в 2022-2023 гг',
            release_status: ReleaseStatus.RELEASING,
            characters: {
                connect: [
                    {
                        id: characterList[15].id,
                    },
                    {
                        id: characterList[16].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[15].id,
                    },
                    {
                        id: authorList[16].id,
                    },
                ],
            },
        },
        {
            id: '9a189481-ba95-4091-a6e9-95ae42319ee2',
            title: 'Хантер X Хантер',
            score: 8.9,
            year: 2011,
            date_start: new Date('2011-10-02'),
            date_end: new Date('2014-09-24'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: genreList[6].id,
                    },
                    {
                        id: genreList[7].id,
                    },
                    {
                        id: genreList[1].id,
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
            description: `
                Главный герой, Гон Фрикс, отправляется на экзамен с целью стать Охотником и найти своего отца. 
                Ему предстоит преодолеть много трудностей на своем пути и встретить замечательных друзей, 
                у каждого из которых свои причины стать Охотником.
            `,
            preview_link: 'https://HUNTERXHUNTER.com',
            status_description: 'в 2011-2014 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[17].id,
                    },
                    {
                        id: characterList[18].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[17].id,
                    },
                    {
                        id: authorList[18].id,
                    },
                ],
            },
        },
        {
            id: 'eef70dab-1363-4b4b-99cb-574655321b28',
            title: 'Чи: О движении Земли',
            score: 0,
            year: 2023,
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: genreList[1].id,
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
            description: `
                Польша, XV-й век. Времена, когда за еретические идеи сжигали на костре.
                Рафал — вундеркинд, интересующийся теологией, самым важным в те времена предметом, 
                и собирающийся поступать в университет по этому направлению. 
                По стечению обстоятельств он однажды встречает таинственного человека 
                и открывает для себя возможную «истину» среди тумана инакомыслия.
            `,
            preview_link: 'https://Chi-about.com',
            status_description: 'в 2023-2024 гг',
            release_status: ReleaseStatus.NOT_YET_RELEASED,
            characters: {
                connect: [
                    {
                        id: characterList[19].id,
                    },
                    {
                        id: characterList[20].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[19].id,
                    },
                ],
            },
        },
        {
            id: '7ee28cb7-f911-4578-ae15-9981091ae47f',
            title: 'Девушки и танки',
            score: 7.3,
            year: 2012,
            date_start: new Date('2012-10-09'),
            date_end: new Date('2013-03-25'),
            country_of_origin: 'JP',
            genres: {
                connect: [
                    {
                        id: genreList[6].id,
                    },
                    {
                        id: genreList[7].id,
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
            description: `
                Семья Михо Нисидзуми много поколений пилотирует танки, а вот самой ей это не особо нравится.
                Именно поэтому Михо пошла учиться в Академию Оарай, где не было подобных занятий.
                Но теперь всё изменилось, и студсовет принуждает нашу малышку вступить на танковый факультатив,
                чтобы Оарай могли участвовать в ежегодном турнире Сэнся-до. А ведь у неё только наконец
                появились подруги! Но они-то не против, даже наоборот.
            `,
            preview_link: 'https://girls-and-panzer.com',
            status_description: 'в 2012-2013 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[21].id,
                    },
                    {
                        id: characterList[22].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[20].id,
                    },
                    {
                        id: authorList[21].id,
                    },
                ],
            },
        },
        {
            id: '8a1d7510-f7fb-4656-a38d-f06239d57cfe',
            title: 'Класс для героев',
            score: 0,
            year: 2023,
            date_start: new Date('2023-12-31'),
            country_of_origin: 'CH',
            genres: {
                connect: [
                    {
                        id: genreList[6].id,
                    },
                    {
                        id: genreList[0].id,
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
            description: `
                Оказывается герои, одолевшие короля демонов, могут быть знамениты не только этим.
                Например, один такой герой взял и создал специальную академию, которая смогла бы
                воспитать ему достойную смену. Одной из лучших учениц академии стала Арнест Флейминг,
                которая за свои успехи в управлении огнём, получила прозвище Императрица Пламени. 
            `,
            preview_link: 'https://class-for-heroes.com',
            status_description: 'в 2023-2023 гг',
            release_status: ReleaseStatus.NOT_YET_RELEASED,
            characters: {
                connect: [
                    {
                        id: characterList[23].id,
                    },
                    {
                        id: characterList[24].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[22].id,
                    },
                    {
                        id: authorList[23].id,
                    },
                ],
            },
        },
    ];
};
