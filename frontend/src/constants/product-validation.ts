export const VALIDATION_CONFIG = {
  TITLE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  PRICE: {
    MIN_VALUE: 0,
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
} as const;

export const VALIDATION_MESSAGES = {
  TITLE: {
    REQUIRED: 'Title is required',
    MIN: `Title must be at least ${VALIDATION_CONFIG.TITLE.MIN_LENGTH} characters`,
    MAX: `Title must not exceed ${VALIDATION_CONFIG.TITLE.MAX_LENGTH} characters`,
  },
  IMAGE: {
    REQUIRED: 'Image URL is required',
    URL: 'Please enter a valid URL',
  },
  CATEGORY: {
    REQUIRED: 'Category is required',
    INVALID: 'Invalid category',
  },
  PRICE: {
    REQUIRED: 'Price is required',
    MIN: `Price must be greater than or equal to ${VALIDATION_CONFIG.PRICE.MIN_VALUE}`,
    TYPE: 'Price must be a number',
  },
  AVAILABILITY: {
    REQUIRED: 'Availability is required',
  },
  DESCRIPTION: {
    REQUIRED: 'Description is required',
    MIN: `Description must be at least ${VALIDATION_CONFIG.DESCRIPTION.MIN_LENGTH} characters`,
    MAX: `Description must not exceed ${VALIDATION_CONFIG.DESCRIPTION.MAX_LENGTH} characters`,
  },
} as const;
