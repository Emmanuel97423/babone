import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';
import ProductsReducer from '../features/product/productSlice';
import VariantsReducer from '@/features/product/variants/variantSlice';
import ProductVariantReducer from '../features/product/productVariantSlice';
import OptionReducer from '@/features/product/options/optionSlice';
import ImportProductsReducer from '@/features/catalog/import/importProductsSlice';
import CatalogReducer from '@/features/catalog/catalogSlice';
import ModalReducer from '@/features/ui/modal/modalSlice';

export const store = configureStore({
  reducer: {
    catalog: CatalogReducer,
    products: ProductsReducer,
    variants: VariantsReducer,
    productVariant: ProductVariantReducer,
    options: OptionReducer,
    importProduct: ImportProductsReducer,
    modal: ModalReducer,
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
