import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: {},
  authenticated: false,
  established: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export default authSlice.reducer;
