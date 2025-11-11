import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { ApiReducerPaths } from '@/enums';
import { productsApi } from './products-api';
import { usersApi } from './users-api';

export const store = configureStore({
  reducer: {
    [ApiReducerPaths.PRODUCTS_API]: productsApi.reducer,
    [ApiReducerPaths.USERS_API]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, usersApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
