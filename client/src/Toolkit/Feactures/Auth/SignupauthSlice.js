
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupUser = createAsyncThunk('auth/signupUser', async (userData, rejectWithValue) => {
  try {
    const res = await axios.post('https://frontend-backend-d3ey.onrender.com/api/userPost', userData);
    return res.data;
  } catch (err) {
  return rejectWithValue(
    err.response?.data?.message || 'Signup failed'
  );
}

});

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    user: null,
    error: null,
    status: 'idle',
  },
   reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { setUser } = signupSlice.actions;
export default signupSlice.reducer;
