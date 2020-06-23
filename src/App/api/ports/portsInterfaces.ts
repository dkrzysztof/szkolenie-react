// Gets average time spent in specified port by a specified ship
export const GET_PORTS_AVERAGE_TIME_SPENT = "/api/ships/<ship_id>/port_time/<port_id>";
export interface PortsAverageTimeSpent {
    average: number;
}

export const GET_PORTS = "/api/ports";
export interface IPorts {
    Country: string;
    Port: string;
    PortGeoID: number;
    PortID: number;
    PortLatitudeDecimal: number;
    PortLongitudeDecimal: number;
}

export const GET_PORT_DETAILS = "/api/ports/<port_id>";
export interface IPortDetails {
    PortID: number;
    Port: string;
    Country: string;
    PortLongitudeDecimal: number;
    PortLatitudeDecimal: number;
    PortGeoID: number;
}
