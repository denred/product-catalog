import * as yup from 'yup';
import {
  VALIDATION_CONFIG,
  VALIDATION_MESSAGES,
} from '@/constants/product-validation';
import { PRODUCT_CATEGORIES } from '@/constants/product-filters';

export const createValidationSchema = () => {
  return yup.object().shape({
    title: yup
      .string()
      .min(VALIDATION_CONFIG.TITLE.MIN_LENGTH, VALIDATION_MESSAGES.TITLE.MIN)
      .max(VALIDATION_CONFIG.TITLE.MAX_LENGTH, VALIDATION_MESSAGES.TITLE.MAX)
      .required(VALIDATION_MESSAGES.TITLE.REQUIRED),

    image: yup
      .string()
      .url(VALIDATION_MESSAGES.IMAGE.URL)
      .required(VALIDATION_MESSAGES.IMAGE.REQUIRED),

    category: yup
      .string()
      .oneOf([...PRODUCT_CATEGORIES], VALIDATION_MESSAGES.CATEGORY.INVALID)
      .required(VALIDATION_MESSAGES.CATEGORY.REQUIRED),

    price: yup
      .number()
      .typeError(VALIDATION_MESSAGES.PRICE.TYPE)
      .min(VALIDATION_CONFIG.PRICE.MIN_VALUE, VALIDATION_MESSAGES.PRICE.MIN)
      .required(VALIDATION_MESSAGES.PRICE.REQUIRED),

    availability: yup
      .boolean()
      .required(VALIDATION_MESSAGES.AVAILABILITY.REQUIRED),

    slug: yup.string().optional(),

    description: yup
      .string()
      .min(
        VALIDATION_CONFIG.DESCRIPTION.MIN_LENGTH,
        VALIDATION_MESSAGES.DESCRIPTION.MIN
      )
      .max(
        VALIDATION_CONFIG.DESCRIPTION.MAX_LENGTH,
        VALIDATION_MESSAGES.DESCRIPTION.MAX
      )
      .required(VALIDATION_MESSAGES.DESCRIPTION.REQUIRED),
  });
};
