import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {supabase} from '@/utils/supabaseClient';
interface Store {
    name: string;
    address: string;
    zip: number | null;
}

interface StoreState {
    entities:Store[],
    loading:'idle' | 'pending' | 'succeeded' | 'failed';
    isLogined: boolean;
    error: string | undefined;
}

export const addStore = createAsyncThunk('store/addStore', async(payload:{storeName: string, address:string, zip:number, userId:string})=>{
console.log('payload:', payload)


    const { data, error } = await supabase
  .from('Store')
  .insert([
    { name: payload.storeName, address: payload.address, zip: payload.zip, userId:payload.userId },
  ])
  .select();
  if(data){
    return data
  }
  if(error){
    throw new Error(error.message)
  }


})

const initialState = {
  entities: [],
  loading: 'idle',
  error: undefined,
  isLogined: false
} as StoreState;

const storeSlice = createSlice({
    name:'store',
    initialState,
    reducers:{},
    extraReducers: builder=>{
        builder.addCase(addStore.pending, (state, action)=>{
            state.loading="pending"
        })
        .addCase(addStore.fulfilled, (state, action)=>{
            state.loading="succeeded";
            state.entities.push(action.payload)
        })
        .addCase(addStore.rejected, (state, action)=>{
            state.loading="failed";
            if(action.error.message){
                state.error = action.error
            }
        })
    }

});

export default storeSlice.reducer