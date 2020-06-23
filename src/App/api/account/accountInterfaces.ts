// LOGIN
export interface LoginResponse {
    message: string;
    headers: LoginHeaders;
}

interface LoginHeaders {
    "jwt-token": string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface ValidateResponse {
    response: any;
}

export interface ErrorMessage {
    message: string;
}

export enum Roles {
    ADMIN = "Administrator",
    USER = "User",
}
