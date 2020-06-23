import { requests } from "../agent";
import { LoginRequest, LoginResponse, ValidateResponse } from "./accountInterfaces";
import { stringify } from "querystring";

export const AccountEndpoints = {
    login: (loginRequest: LoginRequest): Promise<LoginResponse> =>
        requests.post(
            "/login",
            stringify({
                username: loginRequest.username,
                password: loginRequest.password,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        ),

    validateSession: (): Promise<ValidateResponse> => {
        const token = localStorage.getItem("token");

        return requests.get(
            "/api/ports",
            {},
            {
                params: {
                    "page-number": 1,
                    "page-size": 1,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },
};
