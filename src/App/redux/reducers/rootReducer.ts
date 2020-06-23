import { combineReducers } from "@reduxjs/toolkit";
import { sessionSlice } from "./sessionSlice";
import { shipsSlice } from "./shipsReducer";

const rootReducer = combineReducers({
    session: sessionSlice.reducer,
    ships: shipsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type ShipState = ReturnType<typeof shipsSlice.reducer>;
export default rootReducer;
