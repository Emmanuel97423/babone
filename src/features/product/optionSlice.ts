import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

interface Option {
    
    name: string;
    value: string;
};
interface Options {
    id?: string;
    name?:string;
    options: Option[];
   

};

interface OptionState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const addNewsOptions = createAsyncThunk('options/addOptions', async(optionPayload:Options)=>{
    const response = await fetch(`${import.meta.env.API_BASE_URL}/options/add`,optionPayload);
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