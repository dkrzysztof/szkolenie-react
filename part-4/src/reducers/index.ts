import { combineReducers } from '@reduxjs/toolkit';
import { counterSlice } from './counterSlice';

export const rootReducer = combineReducers({
	counter: counterSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
