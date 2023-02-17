type BucketConfigItem = {
    // max single file size limit in KB
    maxFileSize?: number;
    // bucket name from CDN_BUCKET env
    bucket: string;
    // string with allowed file extensions separated by '/'
    validation?: string;
};

const VALIDATION = {
    image: '.png/.jpg/.gif',
};

export const BUCKET_CONFIG = {
    thumbnail: {
        maxFileSize: 20048,
        bucket: 'images1',
        validation: VALIDATION.image,
    },
    banner: {
        maxFileSize: 10 * 1024,
        bucket: 'images1',
        validation: VALIDATION.image,
    },
    cover: {
        maxFileSize: 100 * 1024,
        bucket: 'images1',
        validation: VALIDATION.image,
    },
} satisfies Record<string, BucketConfigItem>;

export function getMaxFileSize() {
    const cdnFileSizeLimit = 6 * 1024 * 1024;
    const maxFileSize = Object.values(BUCKET_CONFIG).reduce((max, { maxFileSize }) => Math.max(max, maxFileSize), 0);
    return Math.min(maxFileSize, cdnFileSizeLimit) * 1024;
}
