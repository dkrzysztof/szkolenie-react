export const GET_SHIP_DETAILS = "/api/ships/<ship_id>";
export interface ShipEntity {
    ShipId: number;
    ShipName: string;
    ShipType: string;
    Status: string;
    VesselAge: number;
    BuiltDate: Date;
    DDLastDate: Date;
    DDNextDate: Date;
    ShipManager: string;
    ShipOwner: string;
    ShipBuilder: string;
    CountryOrigin: string;
    RegionOrigin: string;
    TechnicalManager: string;
    TechnicalManagerCountry: string;
    TechnicalManagerRegion: string;
    ShipOperator: string;
    Active: boolean;
    SalesRepresentative: string;
}

export interface IGetResponseShipsAll {
    count: number;
    data: ShipShortEntity[];
}

export const GET_ARRAY_OF_SHIPS = "/api/ships";
export type ShipShortEntity = {
    shipId: number;
    shipName: string;
    shipType: string;
    status: string;
    vesselAge: number;
    shipManager: string;
    shipOwner: string;
};

export const GET_SHIP_ROUTES = "/api/ships/<ship_id>/movements";
export type ShipMovementArray = [
    {
        IdMovement: string | number;
        ShipName: string;
        PortFrom: string;
        CountryFrom: string;
        PortDestination: string;
        PortArrivalDate: Date;
        SailDate: Date;
        PortLongitudeDecimal: number;
        PortLatitudeDecimal: number;
    }
];

export const GET_SHIP_ROUTE = "/api/ships/<ship_id>/movements/<route_id>";
export interface ShipRoute {
    IdMovement: string | number;
    ShipName: string;
    PortFrom: string;
    CountryFrom: string;
    HoursInPort: number;
    PortDestination: string;
    PortArrivalDate: Date;
    SailDate: Date;
    PortLongitudeDecimal: number;
    PortLatitudeDecimal: number;
    LastPortofCallArrivalDate: string;
    LastPortofCallCountry: string;
    LastPortofCallName: string;
    LastPortofCallSailDate: string;
}

export const GET_SHIP_ROUTE_WEATHER = "/api/ships/<ship_id>/movements/<route_id>/weather";
export interface ShipRouteWeather {
    AirTemperature: number | null;
    CloudAmount: number | null;
    CloudHeight: number | null;
    IdMovement: string;
    SeaLevelPressure: number | null;
    SeaSurfaceTemperature: number | null;
    Visibility: number | null;
    WaveHeight: number | null;
    WavePeriod: number | null;
    WetBulbTemperature: number | null;
    WindDirection: number | null;
    WindSpeed: number | null;
}

export const GET_SHIP_AVERAGE_TIME_IN_PORT = "/api/ships/<ship_id>/port_time/<port_id>";
export interface ShipAvgTimeInPort {
    AverageTime: number;
}

export interface ResponseError {
    description: string;
    error: string;
    status_code: number;
}

export interface IShipsFilterParams {
    "ship-id"?: number;
    "ship-name"?: string;
    "ship-type"?: string;
    status?: string;
    "ship-manager"?: string;
    "ship-owner"?: string;
    "vessel-age"?: number;
    "sales-rep"?: string;
}
