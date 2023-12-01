import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slice/token.slice';
import dataSlice from './data/dataSlice';
import editarSlice from './data/editarSlice';

const store = configureStore({
	reducer: {
		token: tokenSlice,
		data: dataSlice,
		editar: editarSlice,
	},
});

export default store;
