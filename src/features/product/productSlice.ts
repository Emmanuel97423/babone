import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAsyncThunk,
  EntityState
} from '@reduxjs/toolkit';
import {supabase} from '@/utils/supabaseClient';

import { fetchProductsFromDatabase } from '@/services/database/products';
import type { Products, Product } from '../../types/interfaces/Product';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

interface ProductsState extends EntityState<Product> {
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: string | undefined;
}

const PRODUCT_TABLE = 'Product';


const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState: ProductsState = productsAdapter.getInitialState({
  status: 'idle',
  error: 'string | undefined'
});

// export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
//   const response = await fetch("http://127.0.0.1:1420/api/products")
//   const data = await response.json()
//   return data
// })
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (payload:{storeId:number}) => {
    try {
      // const response = await fetchProductsFromDatabase(payload.storeId);
      const response = await supabase.from(PRODUCT_TABLE).select('*').eq('storeId', payload.storeId)
      if (response.data && response.data.length > 0) {

        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log('error:', error);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action) => {
        console.log('action:', action)
        if (action.payload) {
          state.status = 'success';
          productsAdapter.setAll(state, action.payload);
        } else {
          // handle the case where payload is undefined
          // for example, set status to "failed" and an appropriate error message
          state.status = 'failed';
          state.error = 'Failed to fetch products';
        }
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error?.message;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = 'loading';
    });
  }
});

export default productSlice.reducer;

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state: RootState) => state.products);
