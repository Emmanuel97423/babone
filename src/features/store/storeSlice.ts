import {createSlice, createAsyncThunk, PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {supabase} from '@/utils/supabaseClient';
import { RootState } from '@/store/store';
interface Store {
    id: number;
    name: string;
    address: string;
    zip: number | undefined;
    userId:string;
}

interface StoreState {
    entities:Store[],
    entitie:Store[] | [],
    loading:'idle' | 'pending' | 'succeeded' | 'failed';
    isLogined: boolean;
    error: SerializedError;
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

let { data: Store, error } = await supabase
  .from('Store')
  .select("*")

  // Filters
  .eq('userId', payload.userId)
   
  if(Store){
    return Store as Store[]
  }
  if(error){
    console.log('error:', error)
    throw new Error(error.message)
  }


})
export const updateStores = createAsyncThunk('store/updateStores', async(payload:{storeId:number, storeName: string, address:string, zip:number | undefined})=>{

let { data: Store, error } = await supabase
  .from('Store')
  .update({ name: payload.storeName, address: payload.address, zip: payload.zip})
  .eq('id', payload.storeId)
  .select()
   
  if(Store){
    return Store as Store[]
  }
  if(error){
    console.log('error:', error)
    throw new Error(error.message)
  }


})
export const fetchOneStore = createAsyncThunk('store/fetchOneStore', async(payload:{storeId:number})=>{

let { data: Store, error } = await supabase
  .from('Store')
  .select("*")
  .eq('id', payload.storeId)
  .select()
   
  if(Store){
    return Store as Store[]
  }
  if(error){
    console.log('error:', error)
    throw new Error(error.message)
  }


})
export const deleteStore = createAsyncThunk('store/deleteStore', async(payload:{storeId:number})=>{

let {  error } = await supabase
  .from('Store')
  .delete()
  .eq('id', payload.storeId)
   
  // if(Store){
  //   return Store as Store[]
  // }
  if(error){
    console.log('error:', error)
    throw new Error(error.message)
  }


})


const initialState = {
  entities: [],
  entitie: [],
  loading: 'idle',
  error: null,
  isLogined: false
} as unknown as StoreState;

const storeSlice = createSlice({
    name:'store',
    initialState,
    reducers:{
      storeById: (state, action: PayloadAction<number>)=>{
state.entitie = state.entities.filter((store:Store) => store.id === action.payload)
      }
    },
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
            state.loading="succeeded";
            if(action.payload){
              state.entities=action.payload
            }
        })
        .addCase(fetchStores.rejected, (state, action)=>{
            state.loading="failed";
            if(action.error.message){
                state.error = action.error
            }
        })
         .addCase(updateStores.pending, (state, action)=>{
            state.loading="pending"
        })
        .addCase(updateStores.fulfilled, (state, action)=>{
            state.loading="succeeded";
            if(action.payload){
              state.entities=action.payload
            }
        })
        .addCase(updateStores.rejected, (state, action)=>{
            state.loading="failed";
            if(action.error.message){
                state.error = action.error
            }
        })
         .addCase(fetchOneStore.pending, (state, action)=>{
            state.loading="pending"
        })
        .addCase(fetchOneStore.fulfilled, (state, action)=>{
            state.loading="succeeded";
            if(action.payload){
              state.entitie=action.payload
            }
        })
        .addCase(fetchOneStore.rejected, (state, action)=>{
            state.loading="failed";
            if(action.error.message){
                state.error = action.error
            }
        })
        .addCase(deleteStore.pending, (state, action)=>{
            state.loading="pending"
        })
        .addCase(deleteStore.fulfilled, (state, action)=>{
            state.loading="succeeded";
            
        })
        .addCase(deleteStore.rejected, (state, action)=>{
            state.loading="failed";
            if(action.error.message){
                state.error = action.error
            }
        })
    }

});

export const { storeById } = storeSlice.actions;

export default storeSlice.reducer