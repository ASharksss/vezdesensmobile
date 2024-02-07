import { configureStore } from '@reduxjs/toolkit'
import {UserReducer} from "./slices/AuthSlice";
import {CategoryReducer} from "./slices/CategorySlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    category: CategoryReducer
  },
})