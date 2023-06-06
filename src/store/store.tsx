import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';
import ProductsReducer from '../features/product/productSlice';
import ProductVariantReducer from '../features/product/productVariantSlice';
import OptionReducer from '@/features/product/options/optionSlice';
export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    productVariant: ProductVariantReducer,
    options: OptionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
