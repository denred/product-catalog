import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/types/product';
import {
  ApiReducerPaths,
  ApiTagTypes,
  ApiEndpoints,
  HttpMethods,
} from '@/enums';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const productsApi = createApi({
  reducerPath: ApiReducerPaths.PRODUCTS_API,
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [ApiTagTypes.PRODUCTS],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ApiEndpoints.PRODUCTS,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: ApiTagTypes.PRODUCTS as const,
                id: _id,
              })),
              { type: ApiTagTypes.PRODUCTS, id: 'LIST' },
            ]
          : [{ type: ApiTagTypes.PRODUCTS, id: 'LIST' }],
    }),
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `${ApiEndpoints.PRODUCTS}/${slug}`,
      providesTags: (result, error, slug) => [
        { type: ApiTagTypes.PRODUCTS, id: result?._id },
        { type: ApiTagTypes.PRODUCTS, id: slug },
      ],
    }),
    getProductCategories: builder.query<string[], void>({
      query: () => `${ApiEndpoints.PRODUCTS}/categories`,
      providesTags: [{ type: ApiTagTypes.PRODUCTS, id: 'CATEGORIES' }],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: ApiEndpoints.PRODUCTS,
        method: HttpMethods.POST,
        body,
      }),
      invalidatesTags: [
        { type: ApiTagTypes.PRODUCTS, id: 'LIST' },
        { type: ApiTagTypes.PRODUCTS, id: 'CATEGORIES' },
      ],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; data: Partial<Product>; oldSlug?: string }
    >({
      query: ({ id, data }) => ({
        url: `${ApiEndpoints.PRODUCTS}/${id}`,
        method: HttpMethods.PUT,
        body: data,
      }),
      invalidatesTags: (result, error, { id, oldSlug }) => {
        const tags = [
          { type: ApiTagTypes.PRODUCTS, id },
          { type: ApiTagTypes.PRODUCTS, id: 'LIST' },
          { type: ApiTagTypes.PRODUCTS, id: 'CATEGORIES' },
        ];

        if (oldSlug && result?.slug && oldSlug !== result.slug) {
          tags.push({ type: ApiTagTypes.PRODUCTS, id: oldSlug });
        }

        return tags;
      },
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ApiEndpoints.PRODUCTS}/${id}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: () => [
        { type: ApiTagTypes.PRODUCTS, id: 'LIST' },
        { type: ApiTagTypes.PRODUCTS, id: 'CATEGORIES' },
      ],
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          dispatch(
            productsApi.util.updateQueryData(
              'getProducts',
              undefined,
              (draft) => {
                return draft.filter((product) => product._id !== id);
              }
            )
          );
        } catch {
          console.error('Error deleting product from cache');
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetProductCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
