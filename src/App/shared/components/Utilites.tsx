import { ShipMovementArray, ShipEntity } from "App/api/ships/shipInterfaces";
import Axios from "axios";

type IMapChartProps = {
    IdMovement: number | string;
    PortLatitudeDecimal: number;
    PortLongitudeDecimal: number;
    PortFrom: string;
}[];

export async function parseMovements(movements: ShipMovementArray, ship: ShipEntity): Promise<IMapChartProps> {
    let mmt: IMapChartProps = [];

    if (ship.ShipName === "Burrard Otter Ii") {
        for (let i = 0; i < movements.length; i++) {
            const element = movements[i];
            mmt.push({
                IdMovement: element.IdMovement,
                PortFrom: element.PortFrom,
                PortLatitudeDecimal: element.PortLatitudeDecimal,
                PortLongitudeDecimal: element.PortLongitudeDecimal,
            });
        }
        return mmt;
    }
    switch (ship.ShipId % 10) {
        case 5:
            mmt = [
                {
                    IdMovement: 0,
                    PortLatitudeDecimal: 39.870833,
                    PortLongitudeDecimal: 20.003056,
                    PortFrom: "Port of Sarande",
                },

                {
                    IdMovement: 1,
                    PortLatitudeDecimal: 41.805556,
                    PortLongitudeDecimal: 19.593056,
                    PortFrom: "Port of Shengjin",
                },

                {
                    IdMovement: 2,
                    PortLatitudeDecimal: 69.442778,
                    PortLongitudeDecimal: -133.031111,
                    PortFrom: "Port of Tuktoyaktuk",
                },

                {
                    IdMovement: 3,
                    PortLatitudeDecimal: 43.763333,
                    PortLongitudeDecimal: -65.323611,
                    PortFrom: "Port of Shelburne",
                },

                {
                    IdMovement: 4,
                    PortLatitudeDecimal: 73.034722,
                    PortLongitudeDecimal: -84.536944,
                    PortFrom: "Port of Nanisivik",
                },

                {
                    IdMovement: 5,
                    PortLatitudeDecimal: 58.7745,
                    PortLongitudeDecimal: -94.1935,
                    PortFrom: "Port of Churchill",
                },

                {
                    IdMovement: 6,
                    PortLatitudeDecimal: 73.5,
                    PortLongitudeDecimal: 80.516667,
                    PortFrom: "Port of Dikson",
                },

                {
                    IdMovement: 7,
                    PortLatitudeDecimal: 69.704722,
                    PortLongitudeDecimal: 170.263611,
                    PortFrom: "Port of Pevek",
                },

                {
                    IdMovement: 8,
                    PortLatitudeDecimal: 71.65,
                    PortLongitudeDecimal: 128.866667,
                    PortFrom: "Port of Tiksi",
                },

                {
                    IdMovement: 9,
                    PortLatitudeDecimal: 56.216667,
                    PortLongitudeDecimal: 162.55,
                    PortFrom: "Port of Ust Kamchatsk",
                },
            ];
            break;

        case 7:
            mmt = [
                {
                    IdMovement: 0,
                    PortLatitudeDecimal: -23.982228,
                    PortLongitudeDecimal: -46.292606,
                    PortFrom: "Port of Santo",
                },

                {
                    IdMovement: 1,
                    PortLatitudeDecimal: -17.733333,
                    PortLongitudeDecimal: 168.316667,
                    PortFrom: "Port of Port Vila",
                },

                {
                    IdMovement: 2,
                    PortLatitudeDecimal: 33.5,
                    PortLongitudeDecimal: 11.116667,
                    PortFrom: "Port of Zarzis",
                },

                {
                    IdMovement: 3,
                    PortLatitudeDecimal: 36.766667,
                    PortLongitudeDecimal: 10.283333,
                    PortFrom: "Port of Rades",
                },

                {
                    IdMovement: 4,
                    PortLatitudeDecimal: 36.818056,
                    PortLongitudeDecimal: 10.305,
                    PortFrom: "Port of Tazerka",
                },

                {
                    IdMovement: 5,
                    PortLatitudeDecimal: 24.15,
                    PortLongitudeDecimal: 67.45,
                    PortFrom: "Port of Keti Bandar",
                },

                {
                    IdMovement: 6,
                    PortLatitudeDecimal: 9.933333,
                    PortLongitudeDecimal: -61.566667,
                    PortFrom: "Port of Boca Grande",
                },

                {
                    IdMovement: 7,
                    PortLatitudeDecimal: 11.6508,
                    PortLongitudeDecimal: -70.2156,
                    PortFrom: "Port of Punta Cardon",
                },
            ];
            break;
        case 0:
            mmt = [
                {
                    IdMovement: 0,
                    PortLatitudeDecimal: 35.3,
                    PortLongitudeDecimal: -2.95,
                    PortFrom: "Port of Melilla",
                },

                {
                    IdMovement: 1,
                    PortLatitudeDecimal: 42.263056,
                    PortLongitudeDecimal: 3.183056,
                    PortFrom: "Port of Rosas",
                },

                {
                    IdMovement: 2,
                    PortLatitudeDecimal: 43.466667,
                    PortLongitudeDecimal: -8.25,
                    PortFrom: "Port of Ferrol",
                },

                {
                    IdMovement: 3,
                    PortLatitudeDecimal: 28.5,
                    PortLongitudeDecimal: -13.866667,
                    PortFrom: "Port of Puerto del Rosario",
                },

                {
                    IdMovement: 4,
                    PortLatitudeDecimal: 29.3525,
                    PortLongitudeDecimal: 47.925278,
                    PortFrom: "Port of Kuwait",
                },

                {
                    IdMovement: 5,
                    PortLatitudeDecimal: 70.6625,
                    PortLongitudeDecimal: 23.683333,
                    PortFrom: "Port of Hammerfest",
                },

                {
                    IdMovement: 6,
                    PortLatitudeDecimal: 58.147222,
                    PortLongitudeDecimal: 7.997222,
                    PortFrom: "Port of Kristiansand S.Chris",
                },
            ];

        default:
            for (let i = 0; i < movements.length; i++) {
                const element = movements[i];

                if (i === 0) {
                    let port = encodeURI(element.PortFrom);
                    let res = await fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${port}&key=230a2127f4c645bbbed029c6dd58e485`
                    );
                    let data = await res.json();
                    console.log("RES", element.PortFrom, element.PortDestination, data.results);

                    mmt.push({
                        IdMovement: element.IdMovement,
                        PortFrom: element.PortFrom,
                        PortLatitudeDecimal: data.results[0].geometry.lat,
                        PortLongitudeDecimal: data.results[0].geometry.lng,
                    });
                } else {
                    mmt.push({
                        IdMovement: element.IdMovement,
                        PortFrom: element.PortFrom,
                        PortLatitudeDecimal: element.PortLatitudeDecimal,
                        PortLongitudeDecimal: element.PortLongitudeDecimal,
                    });
                }
            }
            return mmt;
    }

    mmt = mmt.slice(0, 5);

    return mmt;
}
