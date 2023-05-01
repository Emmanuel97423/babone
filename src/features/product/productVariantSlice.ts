import { createSlice, createEntityAdapter, createSelector, createAsyncThunk, EntityState } from "@reduxjs/toolkit";
import { Products, Product, ProductVariant } from "../../types/interfaces/Product";
import { useGetProductVariantQuery } from '../../features/api/apiSlice'
interface ProductVariantState  {
  status: "idle" | "loading" | "failed" | "success";
  error: string | undefined;
}


const productVariantAdapter = createEntityAdapter<ProductVariant>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState: ProductVariantState = ({
  status: 'idle',
  error: 'string | undefined',
})

export const fetchProductVariant = createAsyncThunk('product/fetchProductVariant', async (variantId:string) => {
  const response = await fetch(`http://127.0.0.1:1420/api/products/variants/${variantId}`)
  const data = response
  return data
})



    

const productVariantSlice = createSlice({
    name: "productVariant",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductVariant.fulfilled, (state, action) => {
            console.log('action:', action.payload)
            state.status = "success";

            // productVariantAdapter.setAll(state , action.payload)
        })
        builder.addCase(fetchProductVariant.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error?.message;
        })
        builder.addCase(fetchProductVariant.pending, (state, action) => {
            state.status = "loading";
        }
        )
    }
});



export default productVariantSlice.reducer;
