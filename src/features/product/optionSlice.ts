import {createSlice, createAsyncThunk, Dispatch} from '@reduxjs/toolkit';
import { State } from 'history';

interface Option {
    
    name: string;
    value: string;
};
interface Options {
    id?: string;
    name?:string;
    detail:string;
    type:string;
    options: string[];
   

};
// type AsyncThunkConfig = {
//   /** return type for `thunkApi.getState` */
//   state?: unknown
//   /** type for `thunkApi.dispatch` */
//   dispatch?: Dispatch
//   /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
//   extra?: unknown
//   /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
//   rejectValue?: unknown
//   /** return type of the `serializeError` option callback */
//   serializedErrorType?: unknown
//   /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
//   pendingMeta?: unknown
//   /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
//   fulfilledMeta?: unknown
//   /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
//   rejectedMeta?: unknown
// }

interface OptionState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export const addNewsOptions = createAsyncThunk(`options/addOptions`, async(payload:{options:Options, storeId:string})=>{
    console.log('payload:', payload)
    const response = await fetch(`${import.meta.env.API_BASE_URL}/options/add`,{
        method: 'POST',
        body:JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }
    });
    return (await response.json()) as Options
})

const initialState = {
    entities: [],
    loading:'idle',
} as OptionState

const optionSlice = createSlice({
    name:'options',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewsOptions.pending, (state, action)=>{
            state.loading = 'pending'
        })
        .addCase(addNewsOptions.fulfilled,(state, action)=>{
            state.loading='succeeded'
        })
        .addCase(addNewsOptions.rejected,(state, action)=>{
            state.loading="failed"
        })
    }
});

export default optionSlice;