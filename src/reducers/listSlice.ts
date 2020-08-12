import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListElement {
	key: number;
	text: string;
}

interface ListState {
	data: ListElement[];
	key: number;
}

const initialState: ListState = {
	data: [],
	key: 0
};

export const listSlice = createSlice({
	initialState,
	name: 'counter',
	reducers: {
		addItem: (state: ListState, action: PayloadAction<string>) => {
			state.data.push({ text: action.payload, key: state.key });
			state.key += state.key;
		},
		removeItem: (state: ListState, action: PayloadAction<number>) => {
			console.log(action.payload);
			state.data = state.data.filter(
				(value) => value.key !== action.payload
			);
		}
	}
});

export const { addItem, removeItem } = listSlice.actions;
