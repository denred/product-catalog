export const UPLOAD_CONFIG = {
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],

  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes

  DEFAULT_FILE_EXTENSION: 'jpg',

  UPLOAD_FOLDER: 'products',

  DEFAULT_REGION: 'eu-north-1',

  ERROR_MESSAGES: {
    NO_FILE: 'No file provided',
    INVALID_TYPE: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
    FILE_TOO_LARGE: 'File size too large. Maximum size is 5MB.',
    S3_CONFIG_INCOMPLETE: 'S3 configuration incomplete - bucket name missing',
    S3_UPLOAD_FAILED: 'Failed to upload file to S3',
  },
} as const;

export type AllowedMimeType = (typeof UPLOAD_CONFIG.ALLOWED_MIME_TYPES)[number];
