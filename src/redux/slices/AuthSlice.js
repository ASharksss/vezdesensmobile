import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchLogin = createAsyncThunk('auth/login', async (loginData) => {
  const {data} = await axios.post('api/user/login', loginData)
    .catch(error => {
      throw error.response.data
    })
  return data
})


const initialState = {
  user: {
    items: [],
    token: '',
    username: '',
    errorMsg: '',
    status: 'loading'
  },
  isAuth: false
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.user.items = []
        state.isAuth = false
        state.user.token = ''
        state.user.errorMsg = ''
        state.user.username = ''
        state.user.status = 'loading'
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user.token = action.payload.token
        state.user.username = action.payload.username
        state.isAuth = true
        state.user.errorMsg = ''
        state.user.items = action.payload.profile
        axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
        const date = new Date()
        document.cookie = `session=${action.payload.token}; path=/; expires=${date.setDate(date.getDate() + 365)}`
        document.cookie = `username=${action.payload.username}; path=/; expires=${date.setDate(date.getDate() + 365)}`
        state.user.status = 'loaded'
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.user.items = []
        state.isAuth = false
        state.user.token = ''
        state.user.errorMsg = action.error.message
        state.user.username = ''
        state.user.status = 'error'
      })
})

export const UserReducer = UserSlice.reducer