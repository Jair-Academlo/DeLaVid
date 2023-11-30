import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
	name: 'data',
	initialState: {},
	reducers: {
		setData: (state, action) => {
			const token = action.payload;
			return token;
		},
	},
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
