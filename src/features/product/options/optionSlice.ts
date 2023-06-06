import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {supabase} from '@/utils/supabaseClient';



interface Option {
    id?: string;
    name?:string;
    details:string;
    type:string;
    options: string[];
    storeId?:string;
   

};

interface OptionState {
  entities: Option[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error?:string
}

export const addNewsOptions = createAsyncThunk(`options/addOptions`, async(payload:{options:Option, storeId:string})=>{
    console.log('payload:', payload)
    const response = await fetch(`${import.meta.env.API_BASE_URL}/options/add`,{
        method: 'GET',
        body:JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }
    });
    return (await response.json()) as Option
})

export const fetchOptions = createAsyncThunk('product/options', async(payload:{ storeId:string})=>{
    const { data: options, error} = await supabase.from('option').select().eq('storeId', payload.storeId)

     if (error) {
        throw new Error(error.message)
    }
  
    return options
    
})

const initialState = {
    entities: [],
    loading:'idle',
    error:''
} as OptionState

const OptionSlice = createSlice({
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
         builder.addCase(fetchOptions.pending, (state, action)=>{
            state.loading = 'pending'
        })
        .addCase(fetchOptions.fulfilled,(state, action)=>{
            state.loading='succeeded'
            state.entities = action.payload as Option[]

        })
        .addCase(fetchOptions.rejected,(state, action)=>{
            state.loading="failed"
            state.error = action.error.message
        })
    }
});

export const selectOptions = (state: { options: { entities: Option[]; }; }) => state.options.entities;

export default OptionSlice.reducer;