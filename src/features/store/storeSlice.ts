import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {supabase} from '@/utils/supabaseClient';
import { RootState } from '@/store/store';
interface Store {
    name: string;
    address: string;
    zip: number ;
    userId:string;
}

interface StoreState {
    entities:Store[],
    loading:'idle' | 'pending' | 'succeeded' | 'failed';
    isLogined: boolean;
    error: string | undefined;
}

export const addStore = createAsyncThunk('store/addStore', async(payload:{storeName: string, address:string, zip:number, userId:string})=>{


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
export const fetchStores = createAsyncThunk('store/fetchStores', async(payload:{ userId:string})=>{
console.log('payload:', payload)

let { data: Store, error } = await supabase
  .from('Store')
  .select("*")

  // Filters
  .eq('userId', payload.userId)
   
  if(Store){
    return Store
  }
  if(error){
    console.log('error:', error)
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
            // state.entities= action.payload
        })
        .addCase(addStore.rejected, (state, action)=>{
            state.loading="failed";
            if(action.error.message){
                state.error = action.error
            }
        })
        .addCase(fetchStores.pending, (state, action)=>{
            state.loading="pending"
        })
        .addCase(fetchStores.fulfilled, (state, action)=>{
            console.log('action:', action)
            state.loading="succeeded";
            state.entities=action.payload
        })
        .addCase(fetchStores.rejected, (state, action)=>{
            state.loading="failed";
            if(action.error.message){
                state.error = action.error
            }
        })
    }

});


export default storeSlice.reducer