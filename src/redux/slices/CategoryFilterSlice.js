import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    breadcrumb: [],
    query: null,
    filters: [],
    status: 'loading'
}

export const fetchCategoryList = createAsyncThunk('getCategoriesList',
    async (item) => {
        if (item) {
            const {data} = await axios.get(`api/categories/getCategoriesList?categoryId=${item.id}&object=${item.obId}`)
            return data
        }
        const {data} = await axios.get(`api/categories/getCategoriesList`)
        return data
    }
)

const CategoryFilterSlice = createSlice({
    name: 'category_filter',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(fetchCategoryList.pending, (state) => {
            state.query = null
            state.breadcrumb = []
            state.filters = []
            state.status = 'loading'
        })
        .addCase(fetchCategoryList.fulfilled, (state, action) => {
            state.query = null
            state.breadcrumb = action.payload[0]
            state.filters = action.payload[1]
            state.status = 'loaded'
        })
        .addCase(fetchCategoryList.rejected, (state) => {
            state.query = null
            state.breadcrumb = []
            state.filters = []
            state.status = 'error'
        })

})

export const {setQuery} = CategoryFilterSlice.actions

export const CategoryFilterReducer = CategoryFilterSlice.reducer