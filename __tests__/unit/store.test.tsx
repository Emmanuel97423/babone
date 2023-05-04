import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/features/api/apiSlice';
import ProductsReducer from '@/features/product/productSlice';
import ProductVariantReducer from '@/features/product/productVariantSlice';
import { store } from '@/store/store';

describe('store', () => {
  it('should have correct initial state', () => {
    const expectedState = {
      products: ProductsReducer(undefined, { type: 'unknown' }),
      productVariant: ProductVariantReducer(undefined, { type: 'unknown' }),
      [apiSlice.reducerPath]: apiSlice.reducer(undefined, { type: 'unknown' })
    };

    expect(store.getState()).toEqual(expectedState);
  });

  it('should dispatch actions correctly', () => {
    // Exemple d'action pour tester la réduction des produits
    const exampleProductAction = {
      type: 'products/addProduct',
      payload: { id: 1, name: 'Example Product' }
    };

    // Exemple d'action pour tester la réduction des variantes de produit
    const exampleProductVariantAction = {
      type: 'productVariant/addProductVariant',
      payload: { id: 1, productId: 1, name: 'Example Product Variant' }
    };

    // Dispatch les actions
    store.dispatch(exampleProductAction);
    store.dispatch(exampleProductVariantAction);

    // Vérifiez si les états ont été correctement mis à jour
    expect(store.getState().products).toEqual(
      ProductsReducer(
        ProductsReducer(undefined, { type: 'unknown' }),
        exampleProductAction
      )
    );
    expect(store.getState().productVariant).toEqual(
      ProductVariantReducer(
        ProductVariantReducer(undefined, { type: 'unknown' }),
        exampleProductVariantAction
      )
    );
  });
});
