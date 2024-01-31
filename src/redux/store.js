import { configureStore } from '@reduxjs/toolkit'
import {UserReducer} from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer
  },
})