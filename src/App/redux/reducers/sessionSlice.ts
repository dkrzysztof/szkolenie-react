import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import agent from "App/api/agent";
import {
    LoginRequest,
    LoginResponse,
    ErrorMessage,
    ValidateResponse,
} from "App/api/account/accountInterfaces";
import { AxiosResponse } from "axios";

interface SessionState {
    info: string | null;
    loadingLogin: boolean;
    isFetchingValidation: boolean;
    error: string | null | undefined;
}

interface AxiosResponseToState {
    data: ErrorMessage | undefined;
    status: number;
    statusText: string;
    headers: any;
}

const initialState: SessionState = {
    loadingLogin: false,
    isFetchingValidation: false,
    info: null,
    error: null,
};

function startLoading(state: SessionState) {
    state.loadingLogin = true;
    state.error = null;
}

function loadingFailed(state: SessionState, action: PayloadAction<any>) {
    state.loadingLogin = false;
    state.error = action.payload;
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        authenticationStart: startLoading,
        authenticationSuccess: (state: SessionState, action: PayloadAction<LoginResponse>) => {
            state.loadingLogin = false;
            state.info = action.payload.headers["jwt-token"];
            state.error = null;

            localStorage.setItem("token", action.payload.headers["jwt-token"]);
        },
        authenticationFailure: loadingFailed,
        devalidateSession: (state: SessionState) => {
            state.loadingLogin = false;
            state.error = null;
            state.info = null;

            localStorage.removeItem("token");
        },
        validationStart: (state: SessionState) => {
            state.isFetchingValidation = true;
            state.error = null;
        },
        validationSuccess: (state: SessionState) => {
            state.isFetchingValidation = false;
            state.info = localStorage.getItem("token");
        },
        validationFailure: (state: SessionState, action: PayloadAction<AxiosResponseToState>) => {
            state.isFetchingValidation = false;
            state.error = action.payload.data?.message;
        },
    },
});

export const {
    authenticationStart,
    authenticationSuccess,
    authenticationFailure,
    devalidateSession,
    validationStart,
    validationSuccess,
    validationFailure,
} = sessionSlice.actions;

export const authenticateUser = (
    payload: LoginRequest,
    callbackIfSuccess: () => void
): AppThunk => async (dispatch) => {
    dispatch(authenticationStart());
    agent.Users.login(payload)
        .then((response: LoginResponse) => {
            dispatch(authenticationSuccess(response));
            callbackIfSuccess();
        })
        .catch((error: AxiosResponse) => {
            dispatch(authenticationFailure(error));
        });
};

export const validateSession = (
    setStateCallback: (value: boolean) => void,
    isMounted: () => boolean
): AppThunk => async (dispatch) => {
    dispatch(validationStart());
    agent.Users.validateSession()
        .then((response: ValidateResponse) => {
            dispatch(validationSuccess());
            if (isMounted()) {
                setStateCallback(false);
            }
        })
        .catch((error: AxiosResponse) => {
            dispatch(validationFailure(error));
            if (isMounted()) {
                setStateCallback(false);
            }
        });
};

export const sessionReducer = sessionSlice.reducer;
export const sessionActions = sessionSlice.actions;
