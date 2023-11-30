import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slice/token.slice';
import dataSlice from './data/dataSlice';

const store = configureStore({
	reducer: {
		token: tokenSlice,
		data: dataSlice,
	},
});

export default store;
