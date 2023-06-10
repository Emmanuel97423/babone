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
    const { data, error} = await supabase.from('option').insert(payload.data).select()
    console.log('response:', data)

     if (error) {
        console.log('error:', error)
        throw new Error(error.message)
    }
  
    return data[0]
    
})

export const deleteOptions = createAsyncThunk('product/deleteOptions', async(payload:{ optionId:string})=>{
    const {  error} = await supabase.from('option').delete().eq('id',payload.optionId)

     if (error) {
        console.log('error:', error)
        throw new Error(error.message)
    }
  
    
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
            console.log('action:', action.payload)
            console.log('action.meta.arg.data:', action.meta.arg.data)
            if(action.payload!==null){
               state.entities.push(action.payload as Option)
            }
            state.loading="succeeded"
            
        })
        .addCase(addOptions.rejected,(state, action)=>{
            state.error = action.error.message 
        })
        //Delete Option
         .addCase(deleteOptions.pending,(state, action)=>{
            state.loading="pending"
        })
        .addCase(deleteOptions.fulfilled,(state, action)=>{
            state.entities = state.entities.filter(
                    (option) => option.id !== action.meta.arg.optionId
             );
            state.loading="succeeded"           
        })
        .addCase(deleteOptions.rejected,(state, action)=>{
            state.error = action.error.message 
        })
       
    }
});

export const selectOptions = (state: { options: { entities: Option[]; }; }) => state.options.entities;

export default OptionSlice.reducer;