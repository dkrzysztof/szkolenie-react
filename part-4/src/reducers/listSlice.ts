import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO implement listSlice

// Slice powininen zawierać dwa reducery
//  addItem - dodaje do tablicy list nowy obiekt
//  removeItem - usuwa z tablicy konkretny obiekt

// zmiana state
// przykładowy reducer zmieniajcy dane uzytkownika oraz je usuwajacy
// reducers: {
// 	...
//	// "state" zawsze jest jednego typu. Nasz odnośnik do aktulanych danych
// 	setUsername: (state: UserState, action: PayloadAction<string>) => {
// 		state.username = action.payload
// 	}
//
// 	...
//
//	// parametr "action" jest opcjonalny, gdy nie potrzebujemy zadnych danych z komponentu,
//	// a tylko zasygnalizować wykonanie jakiejs czynności
// 	removeUsername: (state: UserState) => {
// 		state.username = null;
// 	}
// }
