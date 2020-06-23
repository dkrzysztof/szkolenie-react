// import { User } from "App/api/agent";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { AccountEndpoints } from "./account/accountEndpoints";
import { ShipEndpoints } from "./ships/shipEnpoints";
import { PortsEndpoints } from "./ports/portsEnpoints";
import { devalidateSession, validateSession } from "App/redux/reducers/sessionSlice";
import { useDispatch } from "react-redux";
import { PaintsEndpoints } from "./paints/PaintsEndpoints";
import { SalesRepEndpoints } from "./salesRepresentatives/salesRepEndpoints";
import { ModelEndpoints } from "./model/modelEnpoints";

interface AxiosError {
    code: number;
    columnNumber: number;
    config: {
        url: string;
        method: string;
        data: string;
        headers: object;
        baseURL: string;
    };
    description: string;
    fileName: string;
    lineNumber: number;
    message: string;
    name: string;
    number: number;
    stack: string;
    response: any;
}

// axios.defaults.baseURL = `${CONFIG.server.url}:${CONFIG.server.port}/api/`;
axios.defaults.baseURL = `http://localhost:5000/`;

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        if (!config.headers["Content-Type"] || config.headers["Content-Type"] === "")
            config.headers["Content-Type"] = "application/json";

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.message === "Network Error" && !error.response) {
        console.error("Błąd sieci. Czy api działa?");
    }
    const { status, headers, data } = error.response || {};
    if (status === 404) {
        // redirect to 404 view by using redux and component lisener in ProtectedRoutenode_m
        console.log("404: " + error.response);
    }

    if (status === 403) {
        console.log("403: " + error.response);
    }

    if (status === 401) {
        if (data.error === "Invalid token") {
            console.log("TOKEN EXPIRED");

            const dispatch = useDispatch();
            dispatch<any>(
                validateSession(
                    () => {},
                    () => false
                )
            );
        }

        return;
    }

    if (status === 400) {
        console.log(`400: ${error.response}`);
    }

    if (status === 500) {
        console.log(error.response);
        console.log(`500: ${error.response.data}`);
    }

    return error;
});

const responseBody = (response: AxiosResponse) => {
    if (response && response.config && response.config.url === "/login") {
        return { headers: response.headers, ...response.data };
    }
    return response.data;
};

export const requests = {
    get: (url: string, body?: {}, config?: AxiosRequestConfig | undefined) =>
        axios.get(url, { ...config, data: body }).then(responseBody),
    post: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
        axios.post(url, body, config).then(responseBody),
    put: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
        axios.put(url, body, config).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

export default {
    Users: AccountEndpoints,
    Ships: ShipEndpoints,
    Ports: PortsEndpoints,
    Paints: PaintsEndpoints,
    SalesRep: SalesRepEndpoints,
    Models: ModelEndpoints,
};
