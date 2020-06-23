import { requests } from "../agent";
import {
    GET_PORTS,
    GET_PORTS_AVERAGE_TIME_SPENT,
    PortsAverageTimeSpent,
    GET_PORT_DETAILS,
    IPortDetails,
    IPorts,
} from "./portsInterfaces";

export const PortsEndpoints = {
    getPorts: (): Promise<IPorts[]> =>
        requests.get(
            GET_PORTS,
            {},
            {
                params: {
                    "page-size": 10000,
                    "page-number": 1,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ),
    getPortsAverageTimeSpent: (shipID: string, routeID: string): Promise<PortsAverageTimeSpent> =>
        requests.get(
            GET_PORTS_AVERAGE_TIME_SPENT.replace("<ship_id>", shipID).replace("<route_id>", routeID),
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ),
    getPortDetails: (portID: number): Promise<IPortDetails> =>
        requests.get(
            GET_PORT_DETAILS.replace("<port_id>", portID.toString()),
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ),
};
