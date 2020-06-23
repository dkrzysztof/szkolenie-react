import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "App/redux/reducers/rootReducer";
import agent from "App/api/agent";

import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Row, Col, Button } from "antd";
import {
    ISalesRepHistoryOfPaintsDataObject,
    ISalesRepHistoryOfPaintsResponse,
    ISalesRepStatisticsPaintsResponse,
} from "App/api/salesRepresentatives/salesRepInterfaces";
import LoadingScreen from "App/shared/components/LoaderScreen";
import { IMostUsedPaintsResponse } from "App/api/paints/PaintsInterface";

const PPGMarineId: number = 0;

interface IHistogramState {
    isLoading: boolean;
    dataTime: string[] | null;
    dataQuantity: number[] | null;
    name: string | null;
}

interface IPaintedShipsBySalesRep {
    isLoading: boolean;
    dataQuantity: number[];
    dataSalesRep: string[];
}

interface IMostUsedPaint {
    isLoading: boolean;
    dataQuantity: number[] | null;
    dataPaintName: string[] | null;
}

const Home: React.FC<any> = (props: any) => {
    // const state: RootState = useSelector((state: RootState) => state);

    const [histogram, setHistogram] = useState<IHistogramState>({
        isLoading: true,
        dataQuantity: null,
        dataTime: null,
        name: null,
    });

    const [chartPie, setChartPie] = useState<IPaintedShipsBySalesRep>({
        isLoading: true,
        dataQuantity: null,
        dataSalesRep: null,
    });

    const [mostUsedPaint, setMostUsedPaint] = useState<IMostUsedPaint>({
        dataPaintName: null,
        dataQuantity: null,
        isLoading: true,
    });

    useEffect(() => {
        // console.log("START", new Date().toLocaleTimeString());
        agent.SalesRep.getSalesRepHistoryOfPaints(2).then((res: ISalesRepHistoryOfPaintsResponse) => {
            let dataQuantity: number[] = [];
            let dataTime: string[] = [];

            res.data.forEach((value, index, array) => {
                dataQuantity.push(value.count);
                dataTime.push(value.date);
            });

            setHistogram({ isLoading: false, dataQuantity, dataTime, name: "Sales Representative 1" });
            // console.log("HISTOGRAM", new Date().toLocaleTimeString());
        });

        agent.SalesRep.getSalesRepPaintsStatistics().then((res: ISalesRepStatisticsPaintsResponse) => {
            let dataQuantity: number[] = [];
            let dataSalesRep: string[] = [];

            let sum = 0;
            let name = "Others";
            for (let i = 0; i < res.length; i++) {
                if (i < 1) {
                    dataQuantity.push(res[i].count);
                    dataSalesRep.push(res[i].sales_rep);
                } else {
                    sum += res[i].count;
                }
            }

            console.log(sum);
            dataQuantity.push(sum);
            dataSalesRep.push(name);

            setChartPie({
                dataQuantity: dataQuantity.reverse(),
                dataSalesRep: dataSalesRep.reverse(),
                isLoading: false,
            });
            // console.log("PIE", new Date().toLocaleTimeString());
            console.log(chartPie.dataQuantity);
        });

        agent.Paints.getMostUsedPaints().then((res: IMostUsedPaintsResponse) => {
            let dataQuantity: number[] = [];
            let dataPaintName: string[] = [];

            let sum = 0;
            let name = "Others";

            for (let i = 0; i < res.length; i++) {
                if (i < 20) {
                    dataQuantity.push(res[i].quantity);
                    dataPaintName.push(res[i].product);
                } else {
                    sum += res[i].quantity;
                }
            }

            dataQuantity.push(sum);
            dataPaintName.push(name);

            setMostUsedPaint({ isLoading: false, dataQuantity, dataPaintName });
            // console.log("BAR", new Date().toLocaleTimeString());
        });
    }, []);

    // Dane do wykresu kołowego
    const pieChartData = () => ({
        labels: ["Others", "Sales Rep. 1"],
        datasets: [
            {
                label: "Ships painted by Sales Representative 1",
                data: [20420, 65123],
                backgroundColor: ["#36a2ebd0", "#ff6384d0", "ffd15cd0", "9567e0d0", "c8cbd0"],
                borderColor: ["#36a2eb", "#ff6384", "ffd15c", "9567e0", "717884"],
                borderWidth: 2,
            },
        ],
    });

    // Dane do wykresu liniowego
    const lineChartData = () => ({
        labels: histogram.dataTime,
        datasets: [
            {
                data: histogram.dataQuantity,
                label: histogram.name,
                borderColor: "rgba(54, 162, 235, 1)",
                fill: false,
            },
        ],
    });

    // Dane do wykresu slupkowego
    const barChartData = () => ({
        labels: [
            "Paint 1",
            "Paint 2",
            "Paint 3",
            "Paint 4",
            "Paint 5",
            "Paint 6",
            "Paint 7",
            "Paint 8",
            "Paint 9",
            "Paint 10",
            "Paint 11",
            "Paint 12",
            "Paint 13",
            "Paint 14",
            "Paint 15",
            "Paint 16",
            "Paint 17",
            "Paint 18",
            "Paint 19",
            "Paint 20",
            "Others",
        ],
        datasets: [
            {
                label: "Product",
                backgroundColor: [
                    "#ffa600",
                    "#ff7c43",
                    "#f95d6a",
                    "#d45087",
                    "#d45087",
                    "#a05195",
                    "#665191",
                    "#665191",

                    "#2f4b7c",
                    "#2f4b7c",
                    "#2f4b7c",

                    "#003f5c",
                    "#003f5c",
                    "#003f5c",
                    "#003f5c",
                    "#003f5c",
                    "#003f5c",
                    "#003f5c",
                    "#003f5c",
                    "#003f5c",
                    "#c2ced8",
                ],
                data: mostUsedPaint.dataQuantity,
            },
        ],
        responsive: false,
    });

    const minHeight = {
        minHeight: "200px",
    };

    return (
        <React.Fragment>
            <Row justify="center">
                <Col md={24} lg={24}>
                    <div className="box-container__box">
                        <Row justify="center" style={{ height: "100%" }}>
                            <Col span={24} style={{ textAlign: "center" }}>
                                <h1>Ships painted by Sales Representative 1</h1>
                            </Col>
                            <Col span={24} style={{ textAlign: "center" }}>
                                <h3 style={{ color: "gray", letterSpacing: "3px", marginTop: "-1.2em" }}>
                                    T I M E L I N E
                                </h3>
                            </Col>
                            <Col span={24} style={minHeight}>
                                {histogram.isLoading && <LoadingScreen container="fill" />}
                                {histogram.isLoading || <Line height={400} width={1200} data={lineChartData} />}
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={24} lg={12}>
                    <div className="box-container__box">
                        <Row justify="center">
                            <Col span={24} style={{ textAlign: "center" }}>
                                <h1>Most popular products</h1>
                            </Col>
                            <Col span={24} style={minHeight}>
                                {mostUsedPaint.isLoading && <LoadingScreen container="fill" />}
                                {mostUsedPaint.isLoading || <Bar data={barChartData} />}
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={24} lg={12}>
                    <div className="box-container__box">
                        <Row justify="center">
                            <Col span={24} style={{ textAlign: "center" }}>
                                <h1 style={{ marginBottom: "1em" }}>Ships sales representatives</h1>
                            </Col>
                            <Col span={24} style={{ textAlign: "center" }}>
                                <h3 style={{ color: "gray", letterSpacing: "5px" }}></h3>
                            </Col>
                            <Col span={24} style={minHeight}>
                                {chartPie.isLoading && <LoadingScreen container="fill" />}
                                {chartPie.isLoading || (
                                    <Row justify="center">
                                        <Col xs={24} md={4} lg={4} xl={4}>
                                            <Row align="middle">
                                                <Col span={24} style={{ textAlign: "left" }}>
                                                    <strong>{65123}</strong>
                                                    <br />
                                                    Sales Representative 1
                                                </Col>
                                                <Col span={24} style={{ textAlign: "left", marginTop: "2em" }}>
                                                    <strong>{20420}</strong>
                                                    <br />
                                                    Others
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={24} md={20} lg={16} xl={16} style={{ marginBottom: "2em" }}>
                                            <Doughnut
                                                data={pieChartData}
                                                options={{
                                                    legend: {
                                                        reverse: true,
                                                    },
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Home;
