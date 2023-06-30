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
  }
});

export default AuthSlice.reducer;
