
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


const storedUser = JSON.parse(localStorage.getItem('user'));

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, rejectWithValue) => {
  try {
    const res = await axios.get(`https://frontend-backend-d3ey.onrender.com/api/userGet`);
    const user = res.data.find(user => user.email === email && user.password === password);
    if (!user) {
      return rejectWithValue("Invalid email or password");
    }
    
    return user;
  }catch (err) {
  return rejectWithValue(
    err.response?.data?.message || 'Login failed'
  );
}

});



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:storedUser || null, 
    error: null,
    status: 'idle',
  },
  reducers: {
    logout: (state) => {
      state.user = null;
         localStorage.removeItem('user');
      Cookies.remove('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
   localStorage.setItem('user', JSON.stringify(action.payload));
        Cookies.set('user', JSON.stringify(action.payload));

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
