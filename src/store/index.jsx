import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slice/token.slice';

const store = configureStore({
	reducer: {
		token: tokenSlice,
	},
});

export default store;
