import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import agent from "App/api/agent";
import { LoginRequest, LoginResponse, ErrorMessage, ValidateResponse } from "App/api/account/accountInterfaces";
import { AxiosResponse } from "axios";
import {
    ShipShortEntity,
    ShipEntity,
    ResponseError,
    IGetResponseShipsAll,
    IShipsFilterParams,
} from "App/api/ships/shipInterfaces";
import { capitalizeEachWordInString } from "..";

export interface IPagination {
    current: number;
    pageSize: number;
    total: number;
    previous?: number;
}

interface ShipsState {
    isFetchingData: boolean;
    ships: ShipShortEntity[] | null;
    error: string | null;
    selectedShip: {
        id: number | null;
        isFetchingData: boolean;
        info: ShipEntity | null;
        error: ResponseError | null;
    };
    pagination: IPagination;
}

const initialState: ShipsState = {
    isFetchingData: false,
    ships: null,
    error: null,
    selectedShip: {
        id: null,
        isFetchingData: false,
        error: null,
        info: null,
    },
    pagination: {
        previous: 0,
        current: 1,
        pageSize: 10,
        total: 1000,
    },
};

export const shipsSlice = createSlice({
    name: "ships",
    initialState,
    reducers: {
        fetchingShipsStart: (state: ShipsState, action: PayloadAction<IPagination>) => {
            state.isFetchingData = true;
            state.error = null;
            state.ships = null;
            state.pagination.previous = state.pagination.current;
            state.pagination.current = action.payload.current;
            state.pagination.pageSize = action.payload.pageSize;
        },
        fetchingShipsSuccess: (state: ShipsState, action: PayloadAction<IGetResponseShipsAll>) => {
            state.isFetchingData = false;
            let data: ShipShortEntity[] = [];
            for (let i = 0; i < state.pagination.pageSize; i++) {
                action.payload.data[0].vesselAge = i + 1;
                data.push(action.payload.data[0]);
            }
            state.ships = data;
            state.pagination.total = action.payload.count * 100;
        },
        fetchingShipsFailed: (state: ShipsState, action: PayloadAction<string>) => {
            state.isFetchingData = false;
            state.error = action.payload;
            state.pagination.current = state.pagination.previous;
        },
        setSelectedShip: (state: ShipsState, action: PayloadAction<number>) => {
            state.selectedShip.id = action.payload;
            if (state.selectedShip.info && state.selectedShip.info.ShipId !== action.payload) {
                state.selectedShip.info = null;
            }
        },

        shipDetailsStart: (state: ShipsState) => {
            state.selectedShip.isFetchingData = true;
            state.selectedShip.error = null;
            state.selectedShip.info = null;
        },
        shipDetailsSuccess: (state: ShipsState, action: PayloadAction<ShipEntity>) => {
            state.selectedShip.error = null;
            state.selectedShip.isFetchingData = false;
            state.selectedShip.id = action.payload.ShipId;
            state.selectedShip.info = action.payload;
        },
        shipDetailsFailure: (state: ShipsState, action?: PayloadAction<ResponseError>) => {
            state.selectedShip.isFetchingData = false;
            state.selectedShip.error = action.payload;
        },
    },
});

export const {
    fetchingShipsStart,
    fetchingShipsFailed,
    fetchingShipsSuccess,
    setSelectedShip,
    shipDetailsStart,
    shipDetailsSuccess,
    shipDetailsFailure,
} = shipsSlice.actions;

export const fetchShips = (pagination: IPagination, filter?: IShipsFilterParams): AppThunk => async (dispatch) => {
    dispatch(fetchingShipsStart(pagination));
    agent.Ships.getAllShips(pagination, filter)
        .then((response: IGetResponseShipsAll) => {
            dispatch(fetchingShipsSuccess(response));
        })
        .catch((error: { message: string; statusText: string }) => {
            console.log(error.message);
            dispatch(fetchingShipsFailed(error.statusText));
        });
};

export const fetchShipDetails = (shipId: number): AppThunk => async (dispatch) => {
    dispatch(shipDetailsStart());
    agent.Ships.getShipDetails(shipId)
        .then((response: ShipEntity) => {
            dispatch(shipDetailsSuccess(response));
        })
        .catch((error: AxiosResponse) => {
            console.log(error);
            dispatch(shipDetailsFailure());
        });
};

export const sessionReducer = shipsSlice.reducer;
export const sessionActions = shipsSlice.actions;
