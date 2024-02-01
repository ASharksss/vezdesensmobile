import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchLogin = createAsyncThunk('auth/login', async (loginData) => {
  const {data} = await axios.post('api/user/login', loginData)
    .catch(error => {
      throw error.response.data
    })
  return data
})

export const fetchRegistration = createAsyncThunk('auth/registration', async (loginData) => {
  const {data} = await axios.post('api/user/registration', loginData)
    .catch(error => {
      throw error.response.data
    })
  return data
})

export const fetchAuth = createAsyncThunk('auth/check/token', async (token) => {
  const {data} = await axios.get(`api/user/auth?token=${token}`)
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

      .addCase(fetchRegistration.pending, (state) => {
        state.user.items = []
        state.isAuth = false
        state.user.token = ''
        state.user.errorMsg = ''
        state.user.username = ''
        state.user.status = 'loading'
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
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
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.user.items = []
        state.isAuth = false
        state.user.token = ''
        state.user.errorMsg = action.error.message
        state.user.username = ''
        state.user.status = 'error'
      })

      .addCase(fetchAuth.pending, (state) => {
        state.user.items = []
        state.isAuth = false
        state.user.token = ''
        state.user.errorMsg = ''
        state.user.username = ''
        state.user.status = 'loading'
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
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
      .addCase(fetchAuth.rejected, (state, action) => {
        state.user.items = []
        state.isAuth = false
        state.user.token = ''
        state.user.errorMsg = action.error.message
        state.user.username = ''
        state.user.status = 'error'
      })
})

export const UserReducer = UserSlice.reducer