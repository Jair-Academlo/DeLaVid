import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
	name: 'token',
	initialState: false,
	reducers: {
		setToken: (state, action) => {
			const token = action.payload;
			return token;
		},
	},
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
