import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import ProductsReducer from '../features/product/productSlice';
import ProductVariantReducer from '../features/product/productVariantSlice';

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    productVariant: ProductVariantReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
