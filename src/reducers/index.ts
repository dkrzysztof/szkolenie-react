import { combineReducers } from '@reduxjs/toolkit';
import { listSlice } from './listSlice';

export const rootReducer = combineReducers({
	lists: listSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
