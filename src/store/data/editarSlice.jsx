import { createSlice } from '@reduxjs/toolkit';

export const editarSlice = createSlice({
	name: 'editar',
	initialState: false,
	reducers: {
		setEditar: (state, action) => {
			const token = action.payload;
			return token;
		},
	},
});

export const { setEditar } = editarSlice.actions;

export default editarSlice.reducer;
