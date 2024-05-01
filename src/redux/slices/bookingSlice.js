import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookingInfo =
	createAsyncThunk('bookingInfo',
		async (name) => {
			const {data} = await axios.get(`api/ad/bookingInfo?name=${name}`)
			return data
		}
	)

const initialState = {
	bookingInfo: {
		items: [],
		status: 'loading'
	}
}


const BookingSlice = createSlice({
	name: 'booking',
	initialState,
	extraReducers: (builder) =>
		builder
			.addCase(fetchBookingInfo.pending, (state) => {
				state.bookingInfo.items = []
				state.bookingInfo.status = 'loading'
			})
			.addCase(fetchBookingInfo.fulfilled, (state, action) => {
				state.bookingInfo.items = action.payload
				state.bookingInfo.status = 'loaded'
			})
			.addCase(fetchBookingInfo.rejected, (state) => {
				state.bookingInfo.items = []
				state.bookingInfo.status = 'error'
			})

})


export const BookingReducer = BookingSlice.reducer