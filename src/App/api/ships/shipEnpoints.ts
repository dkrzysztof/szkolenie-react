import { requests } from "../agent";
import {
    GET_ARRAY_OF_SHIPS,
    GET_SHIP_DETAILS,
    GET_SHIP_ROUTES,
    GET_SHIP_ROUTE,
    ShipShortEntity,
    ShipEntity,
    ShipMovementArray,
    ShipRoute,
    IGetResponseShipsAll,
    GET_SHIP_ROUTE_WEATHER,
    ShipRouteWeather,
    ShipAvgTimeInPort,
    GET_SHIP_AVERAGE_TIME_IN_PORT,
    IShipsFilterParams,
} from "./shipInterfaces";
import Axios from "axios";
import { capitalizeEachWordInString } from "App/redux";

export const ShipEndpoints = {
    getAllShips: (
        pagination: { current: number; pageSize: number },
        filter?: IShipsFilterParams
    ): Promise<IGetResponseShipsAll> => {
        let params: object = {
            "page-number": pagination.current,
            "page-size": pagination.pageSize,
        };

        if (filter) {
            params = { ...filter, ...params };
        }

        return requests.get(
            GET_ARRAY_OF_SHIPS,
            {},
            {
                params,
                headers: {
                    "Content-Type": "application/json",
                },
                transformResponse: [].concat(Axios.defaults.transformResponse, (res: IGetResponseShipsAll) => {
                    if (res.data && res.count) {
                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i].shipName = capitalizeEachWordInString(res.data[i].shipName);
                            res.data[i].shipType = res.data[i].shipType.toUpperCase();
                        }
                    }

                    return res;
                }),
            }
        );
    },

    getShipDetails: (shipID: number): Promise<ShipEntity> =>
        requests.get(
            GET_SHIP_DETAILS.replace("<ship_id>", shipID.toString()),
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                transformResponse: [].concat(Axios.defaults.transformResponse, (response: ShipEntity) => {
                    response.ShipName = capitalizeEachWordInString(response.ShipName);
                    response.ShipType = response.ShipType.toUpperCase();

                    return response;
                }),
            }
        ),
    getShipAllRoutes: (
        shipID: number,
        pagination: { pageNumber: number; pageSize: number }
    ): Promise<ShipMovementArray> =>
        requests.get(
            GET_SHIP_ROUTES.replace("<ship_id>", shipID.toString()),
            {},
            {
                params: {
                    "page-size": pagination.pageSize,
                    "page-number": pagination.pageNumber,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ),
    getShipRouteDetails: (shipID: string, routeID: string): Promise<ShipRoute> =>
        requests.get(
            GET_SHIP_ROUTE.replace("<ship_id>", shipID).replace("<route_id>", routeID),
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ),
    getShipRouteWeather: (shipID: string, routeID: string): Promise<ShipRouteWeather> =>
        requests.get(GET_SHIP_ROUTE_WEATHER.replace("<ship_id>", shipID).replace("<route_id>", routeID), {}, {}),
    getShipRouteAvgTimeSpentInPort: (shipID: string, portID: string): Promise<ShipAvgTimeInPort> =>
        requests.get(GET_SHIP_AVERAGE_TIME_IN_PORT.replace("<ship_id>", shipID).replace("<port_id>", portID), {}, {}),
};
