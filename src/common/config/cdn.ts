type BucketConfigItem = {
    // max single file size limit in MB
    maxFileSize?: number;
    // bucket name from CDN_BUCKET env
    bucket: string;
    // string with allowed file extensions separated by '/'
    validation?: string;
};

const VALIDATION = {
    JpegPngGif: '.png/.jpg/.jpeg/.gif',
    JpegPngGifSvg: '.png/.jpg/.jpeg/.gif/.svg',
    JpegPng: '.png/.jpg/.jpeg',
};

export const BUCKET_CONFIG = {
    userBanners: {
        maxFileSize: 10,
        bucket: 'user_banners',
        validation: VALIDATION.JpegPngGif,
    },
    userCovers: {
        maxFileSize: 4,
        bucket: 'user_covers',
        validation: VALIDATION.JpegPngGif,
    },
    animeBanners: {
        maxFileSize: 30,
        bucket: 'anime_banners',
        validation: VALIDATION.JpegPngGifSvg,
    },
    animeStills: {
        maxFileSize: 5,
        bucket: 'anime_stills',
        validation: VALIDATION.JpegPng,
    },
    animeCovers: {
        maxFileSize: 20,
        bucket: 'anime_covers',
        validation: VALIDATION.JpegPngGifSvg,
    },
    characters: {
        maxFileSize: 15,
        bucket: 'characters',
        validation: VALIDATION.JpegPngGifSvg,
    },
    authors: {
        maxFileSize: 15,
        bucket: 'authors',
        validation: VALIDATION.JpegPngGifSvg,
    },

    studioThumbnails: {
        maxFileSize: 5,
        bucket: 'studio_thumbnails',
        validation: VALIDATION.JpegPngGifSvg,
    },
} satisfies Record<string, BucketConfigItem>;

export function getMaxFileSize() {
    const cdnFileSizeLimit = 6 * 1024 * 1024;
    const maxFileSize = Object.values(BUCKET_CONFIG).reduce((max, { maxFileSize }) => Math.max(max, maxFileSize), 0);
    return Math.min(maxFileSize, cdnFileSizeLimit) * 1024 * 1024;
}
