import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface counterState {
	count: number;
}

const initialState: counterState = {
	count: 0
};

export const counterSlice = createSlice({
	initialState,
	name: 'counter',
	reducers: {
		increment: (state: counterState, action: PayloadAction<{}>) => {
			state.count = state.count + 1;
		},
		decrement: (state: counterState) => {
			state.count = state.count - 1;
		}
	}
});

const { increment, decrement } = counterSlice.actions;

export default {
	increment,
	decrement
};
