import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAsyncThunk,
  EntityState,
  AsyncThunkAction, 
} from '@reduxjs/toolkit';
import {supabase} from '@/utils/supabaseClient';
// import { fetchVariants} from '@/services/database/products';
import type { ProductVariant} from '@/types/interfaces/Product';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

interface VariantsState {
  entities: ProductVariant[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error?:string
}
const VARIANT_TABLE = "Variant"
// @ts-ignore
export const fetchVariants = createAsyncThunk<ProductVariant[] | undefined >('variants/fetchVariant', async(_,{RejectWithValue})=>{

    const { data: variants, error} = await supabase.from(VARIANT_TABLE).select('*');
     if (error) {
        return RejectWithValue(error.message)
    }   
      return variants    
});

const initialState= {
    entities:[],
    loading:'idle',
    error:'',
} as VariantsState;

const VariantsSlice = createSlice({
    name:'variants',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchVariants.pending, (state)=>{
            state.loading='pending'
        }).addCase(fetchVariants.fulfilled, (state, action)=>{
            state.loading='succeeded';
            state.entities=action.payload as ProductVariant[]
        }).addCase(fetchVariants.rejected,(state,action)=>{
            state.loading='failed';
            state.error=action.error.message
        })
    }
})



export default VariantsSlice.reducer;