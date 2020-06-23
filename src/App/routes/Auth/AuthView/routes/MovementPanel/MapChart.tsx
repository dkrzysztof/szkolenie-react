import React from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Point } from "react-simple-maps";
import { ShipMovementArray } from "App/api/ships/shipInterfaces";
import { IPorts } from "App/api/ports/portsInterfaces";

interface IMapChartProps {
    dataSource: {
        IdMovement: number | string;
        PortLatitudeDecimal: number;
        PortLongitudeDecimal: number;
    }[];
}

// lon - x, lat = y
function coordsCentroidPoint(coords: [number, number][]): Point {
    let sumLat: number = 0;
    let sumLon: number = 0;

    for (let i = 0; i < coords.length; i++) {
        sumLon += coords[i][0];
        sumLat += coords[i][1];
    }

    sumLon /= coords.length;
    sumLat /= coords.length;

    let p: Point = [sumLon, sumLat];
    return p;
}

const MapChart = (props: IMapChartProps) => {
    let coords = [];

    for (let i = 0; i < props.dataSource.length; i++) {
        coords.push([props.dataSource[i].PortLongitudeDecimal, props.dataSource[i].PortLatitudeDecimal]);
    }

    let centroid = coordsCentroidPoint(coords);

    return (
        <ComposableMap style={{ width: "100%", height: "auto" }}>
            <ZoomableGroup center={centroid}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />
                        ))
                    }
                </Geographies>
                {props.dataSource.map((x) => (
                    <Marker key={x.IdMovement} coordinates={[x.PortLongitudeDecimal, x.PortLatitudeDecimal]}>
                        <g
                            fill="none"
                            stroke="#FF5533"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-12, -24)"
                        >
                            <circle cx="12" cy="10" r="3" />
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        </g>
                        {/* <text textAnchor="middle" style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
                            {x.PortFrom}
                        </text> */}
                    </Marker>
                ))}
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default MapChart;

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
