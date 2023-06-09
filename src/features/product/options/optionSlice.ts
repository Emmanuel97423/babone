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

// export const addNewsOptions = createAsyncThunk(`options/addOptions`, async(payload:{options:Option, storeId:string})=>{
//     console.log('payload:', payload)
//     const response = await fetch(`${import.meta.env.API_BASE_URL}/options/add`,{
//         method: 'GET',
//         body:JSON.stringify(payload),
//         headers: {
//             'content-type': 'application/json'
//         }
//     });
//     return (await response.json()) as Option
// })

export const fetchOptions = createAsyncThunk('product/options', async(payload:{ storeId:string})=>{
    const { data: options, error} = await supabase.from('option').select().eq('storeId', payload.storeId)

     if (error) {
        throw new Error(error.message)
    }
  
    return options
    
})

export const addOptions = createAsyncThunk('product/addOptions', async(payload:{ data:Option})=>{
    console.log('payload:', payload.data)
    const { data:response, error} = await supabase.from('option').insert(payload.data)
    console.log('response:', response)

     if (error) {
        console.log('error:', error)
        throw new Error(error.message)
    }
  
    return response
    
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
   
        //Fetch options
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
         //Add Option builder
        .addCase(addOptions.pending,(state, action)=>{
            state.loading="pending"
        })
        .addCase(addOptions.fulfilled,(state, action)=>{
            state.loading="succeeded"
            
        })
        .addCase(addOptions.rejected,(state, action)=>{
            state.error = action.error.message 
        })
       
    }
});

export const selectOptions = (state: { options: { entities: Option[]; }; }) => state.options.entities;

export default OptionSlice.reducer;