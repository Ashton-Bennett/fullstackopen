import { createSlice } from "@reduxjs/toolkit";

const initialState = " ";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      let filterInput = action.payload.toLowerCase();
      return filterInput;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;
