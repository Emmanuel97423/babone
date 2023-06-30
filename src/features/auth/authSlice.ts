import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/utils/supabaseClient';

// interface User {
//   email: string;
//   password: string;
// }

interface UserState {
  entities: {} | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  isLogined: boolean;
  error: string | undefined;
}
//Signup async 
export const signup = createAsyncThunk(
  'auth/signup',
  async (payload: { email: string; password: string }) => {
    // Sign up with email
    const { data: user, error } = await supabase.auth.signUp(payload);
    if (error) {
      throw new Error(error.message);
    }

    return user;
  }
);

//Login async
export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    // Sign up with email
    const { data: user, error } = await supabase.auth.signInWithPassword(payload);
    if (error) {
      throw new Error(error.message);
    }

    return user;
  }
);
//Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
   
    let { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message);
    }

  }
);

const initialState = {
  entities: {},
  loading: 'idle',
  error: undefined,
  isLogined: false
} as UserState;

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //Signup status
      .addCase(signup.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.entities = action.payload.user;
      }).addCase(signup.rejected,(state, action) => {
        state.loading = 'failed'
        if(action.error.message?.toLocaleLowerCase()==='user already registered')
        state.error = 'Un compte avec ce courriel existe déjà'
      })
      //Login status
      .addCase(login.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.entities = action.payload.user;
        state.isLogined=true;
      }).addCase(login.rejected,(state, action) => {
        state.loading = 'failed'
        if(action.error.message?.toLocaleLowerCase()==='invalid login credentials')
        state.error = 'Vos identifiants sont incorrecte'
      })
      //Logout
         .addCase(logout.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.isLogined=false;
      }).addCase(logout.rejected,(state, action) => {
        state.loading = 'failed'
        
      })
  }
});

export default AuthSlice.reducer;
