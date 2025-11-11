import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/types/product';
import {
  ApiReducerPaths,
  ApiTagTypes,
  ApiEndpoints,
  HttpMethods,
} from '@/enums';

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/';

export const productsApi = createApi({
  reducerPath: ApiReducerPaths.PRODUCTS_API,
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [ApiTagTypes.PRODUCTS],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ApiEndpoints.PRODUCTS,
      providesTags: [ApiTagTypes.PRODUCTS],
    }),
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `${ApiEndpoints.PRODUCTS}/${slug}`,
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: ApiEndpoints.PRODUCTS,
        method: HttpMethods.POST,
        body,
      }),
      invalidatesTags: [ApiTagTypes.PRODUCTS],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `${ApiEndpoints.PRODUCTS}/${id}`,
        method: HttpMethods.PUT,
        body: data,
      }),
      invalidatesTags: [ApiTagTypes.PRODUCTS],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ApiEndpoints.PRODUCTS}/${id}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [ApiTagTypes.PRODUCTS],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
