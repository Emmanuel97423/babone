import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {supabase} from '@/utils/supabaseClient';


interface User {
    email: string
    password: string
};

interface UserState {
    entities: User
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    isLogined: boolean
    error: string | null
}

export const signup = createAsyncThunk('auth/signup', async(payload:{email:string, password:string})=>{
  console.log('payload:', payload)
  // Sign up with email
  const { user, error } = await supabase.auth.signUp(payload)
   if (error) {
        throw new Error(error.message)
    }
    console.log('user:', user)
  
    return user
})

const initialState = {
    entities:{},
    loading: 'idle',
    error: null,
    isLogined:false,
} as UserState;


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},

});

export default AuthSlice.reducer