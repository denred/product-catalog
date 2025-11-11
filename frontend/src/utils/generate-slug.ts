import slugify from 'slugify';

/**
 * Generates a URL-friendly slug from a given title
 * @param title - The title to convert to a slug
 * @returns A lowercase, URL-friendly slug
 */
export const generateSlug = (title: string): string => {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
};
