import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, CreateUserDto } from '@/types/user';
import { ApiReducerPaths, HttpMethods, ApiEndpoints } from '../enums';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const usersApi = createApi({
  reducerPath: ApiReducerPaths.USERS_API,
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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ApiEndpoints.USERS,
      providesTags: (result) =>
        result
          ? [
              ...result.map((user) => ({ type: 'User' as const, id: user.id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `${ApiEndpoints.USERS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    createUser: builder.mutation<User, CreateUserDto>({
      query: (userData) => ({
        url: ApiEndpoints.USER_REGISTER,
        method: HttpMethods.POST,
        body: userData,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `${ApiEndpoints.USERS}/${id}`,
        method: HttpMethods.PATCH,
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ApiEndpoints.USERS}/${id}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    deactivateUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `${ApiEndpoints.USERS}/${id}/deactivate`,
        method: HttpMethods.PATCH,
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    login: builder.mutation<
      { user: User },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: ApiEndpoints.USER_LOGIN,
        method: HttpMethods.POST,
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeactivateUserMutation,
  useLoginMutation,
} = usersApi;
