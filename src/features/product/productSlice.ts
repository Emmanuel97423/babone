import { createSlice, createEntityAdapter, createSelector, createAsyncThunk, EntityState } from "@reduxjs/toolkit";
import { Products, Product } from "../../types/interfaces/Product";

interface ProductsState extends EntityState<Product> {
  status: "idle" | "loading" | "failed" | "success";
  error: string | undefined;
}


const productsAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState: ProductsState = productsAdapter.getInitialState({
  status: 'idle',
  error: 'string | undefined',
})

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await fetch("http://127.0.0.1:1420/api/products")
  const data = await response.json()
  return data
})









const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "success";
            productsAdapter.setAll(state , action.payload)
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error?.message;
        })
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = "loading";
        }
        )
    }
});



export default productSlice.reducer;

export const { selectAll: selectAllProducts, selectById: selectProductById } = productsAdapter.getSelectors(
    (state:any) => state.products
);


