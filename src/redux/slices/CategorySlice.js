import {createSlice} from "@reduxjs/toolkit";
import {UserSlice} from "./AuthSlice";

const initialState = {
  category: null,
  subCategory: null,
  object: null
}

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    }
  }
})

export const { setCategory } = CategorySlice.actions

export const CategoryReducer = CategorySlice.reducer
