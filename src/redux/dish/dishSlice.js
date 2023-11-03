import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDishes } from './dishActions';

const initialState = {
  dishData: [],
  isLoading: false,
  error: null
};

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllDishes.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAllDishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dishData = action.payload;
      })
      .addCase(fetchAllDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// export const {} = dishSlice.actions;

export default dishSlice.reducer;
