import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './products-api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ApiReducerPaths } from '@/enums';

export const store = configureStore({
  reducer: {
    [ApiReducerPaths.PRODUCTS_API]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
