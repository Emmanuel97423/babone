import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {supabase} from '@/utils/supabaseClient';
import type {Option} from '@/types/features/product/OptionsType'
import {RootState} from '@/store/store';



// interface Option {
//     id?: string;
//     name?:string;
//     details:string;
//     type?:string;
//     options: string[];
//     storeId?:string;
   

// };

interface OptionState {
  entities: Option[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error?:string
}



export const fetchOptions = createAsyncThunk('product/options', async(payload:{ storeId:string})=>{
    const { data: options, error} = await supabase.from('option').select().eq('storeId', payload.storeId)

     if (error) {
        throw new Error(error.message)
    }
  
    return options
    
})

export const fetchOptionById = createAsyncThunk('product/optionById', async(payload:{ optionId:string})=>{
    console.log('payload:', payload)
    const { data: options, error} = await supabase.from('option').select().eq('id', payload.optionId)

     if (error) {
        throw new Error(error.message)
    }
    console.log('options:', options)
  
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

export const updateOptions = createAsyncThunk('product/updateOptions', async(payload:{ data:Option})=>{
    console.log('payload:', payload)
    const { data, error} = await supabase.from('option').update({name:payload.data.name, details:payload.data.details, type:payload.data.type, options:payload.data.options, }).eq('id',payload.data.id).select()

     if (error) {
        console.log('error:', error)
        throw new Error(error.message)
    }
  if(data){
    console.log('data:', data)
    return data
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
        //Fetch By id
         builder.addCase(fetchOptionById.pending, (state, action)=>{
            state.loading = 'pending'
        })
        .addCase(fetchOptionById.fulfilled,(state, action)=>{
            state.loading='succeeded'
            state.entities = action.payload as Option[]
        })
        .addCase(fetchOptionById.rejected,(state, action)=>{
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
        //Update options

        .addCase(updateOptions.rejected,(state, action)=>{
            state.error = action.error.message 
        })
      
         .addCase(updateOptions.pending,(state, action)=>{
            state.loading="pending"
        })
        .addCase(updateOptions.fulfilled,(state, action)=>{
            console.log('action:', action.payload)
            if(action.payload){
               action.payload.forEach(updatedOption => {
            // ...trouver l'index de l'option avec le même id dans state.entities...
            const index = state.entities.findIndex(option => option.id === updatedOption.id);
            // ...et si elle existe, la remplacer par l'option mise à jour
            if (index !== -1) {
                state.entities[index] = updatedOption as Option;
            }
        });
            }
            state.loading="succeeded"           
        })
       

       
    }
});

export const selectOptions = (state: { options: { entities: Option[]; }; }) => state.options.entities;
export const optionsById=(state:RootState, optionId:string)=> state.options.entities.find((option:Option)=> option.id === optionId)
console.log('optionsById:', optionsById)
// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId)

export default OptionSlice.reducer;