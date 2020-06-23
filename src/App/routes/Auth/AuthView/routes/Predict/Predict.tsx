import React, { useState } from "react";
import agent from "App/api/agent";

import { Form, Row, Col, Input, Button, Tooltip, DatePicker, notification } from "antd";

// Styles Imports
import "./Predict.css";
import { QuestionCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { IModelPredictionRequest, IModelPredictionResponse } from "App/api/model/modelInterface";
import { ResponseError } from "App/api/ships/shipInterfaces";
import LoadingScreen from "App/shared/components/LoaderScreen";

export interface IPredictProps {}

export interface IPredictState {
    nextPaintingDate?: string | null;
    nextPaintingDiff?: number | null;
    isPostingPrediction: boolean;
}

const Predict: React.FC<IPredictProps> = (props: IPredictProps) => {
    const [prediction, setPrediction] = useState<IPredictState>({
        isPostingPrediction: false,
        nextPaintingDate: null,
        nextPaintingDiff: null,
    });

    const postPrediction = (values) => {
        setPrediction({
            isPostingPrediction: true,
        });

        for (let key in values) {
            if (!values[key]) delete values[key];
            if (key === "lastPaintingDate" && values[key]) {
                values[key] = new Date(values[key]._d).getTime();
            }
        }

        agent.Models.postModelPrediction(values as IModelPredictionRequest)
            .then((res: IModelPredictionResponse) => {
                let dueDate = new Date(res.nextPaintingDate);
                let today = new Date();

                let diff = dueDate.getTime() - today.getTime();

                let diffTime = moment(diff).days();
                console.log(diffTime);

                setPrediction({
                    nextPaintingDate: dueDate.toLocaleDateString(),
                    nextPaintingDiff: diffTime,
                    isPostingPrediction: false,
                });
            })
            .catch((error: ResponseError) => {
                setPrediction({
                    isPostingPrediction: false,
                });
                notification.error({
                    message: "An Error occured",
                    description: error.description,
                    placement: "bottomRight",
                });
            });
    };

    function disabledDate(current) {
        return current && current > moment().endOf("day");
    }

    return (
        <div className="panel">
            <Row justify="center">
                <h1>Predict Panel</h1>
            </Row>

            <Form onFinish={postPrediction}>
                <Row className="shipDataInputBox" justify="center">
                    <Col xl={8} lg={8} md={24} sm={24} xs={24} span={8} className="first">
                        <Row className="inputRow">
                            <Form.Item name="shipType">
                                <Input
                                    placeholder="Ship Type"
                                    suffix={
                                        <Tooltip title="Type of a ship ex. Yacht, crewboat">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow">
                            <Form.Item name="status">
                                <Input
                                    placeholder="Status"
                                    suffix={
                                        <Tooltip title="Status of a ship ex. launched, projected">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow">
                            <Form.Item name="vesselAge">
                                <Input
                                    placeholder="Vessel age"
                                    suffix={
                                        <Tooltip title="Age of a vessel in years">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow">
                            <Form.Item name="shipBuilder">
                                <Input
                                    placeholder="Ship builder"
                                    suffix={
                                        <Tooltip title="A company that built the ship">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow">
                            <Form.Item name="shipyardCountry">
                                <Input
                                    placeholder="Shipyard country"
                                    suffix={
                                        <Tooltip title="Country where shipyard is located">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                    </Col>
                    <Col xl={2} lg={2} md={24} sm={24} xs={24} span={8}></Col>
                    <Col xl={8} lg={8} md={24} sm={24} xs={24} span={8} className="second">
                        <Row className="inputRow">
                            <Form.Item name="shipyardRegion">
                                <Input
                                    placeholder="Shipyard region"
                                    suffix={
                                        <Tooltip title="Region where shipyard is located">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow">
                            <Form.Item name="ppgmcTechnicalmanager">
                                <Input
                                    placeholder="Technical manager"
                                    suffix={
                                        <Tooltip title="Who is a technical manager of a ship">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow">
                            <Form.Item name="techmngCountry">
                                <Input
                                    placeholder="Technical manager country"
                                    suffix={
                                        <Tooltip title="Country where technical manager is located">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow">
                            <Form.Item name="techmngRegion">
                                <Input
                                    value="123"
                                    placeholder="Technical manager region"
                                    suffix={
                                        <Tooltip title="Region where technical manager is located">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow">
                            <Form.Item name="salesRep">
                                <Input
                                    value="#PPGMarine"
                                    placeholder="Sales representative"
                                    suffix={
                                        <Tooltip title="Who is a sales representative of a certain ship">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24} span={12}>
                        <Row className="inputRow" justify="center">
                            <Form.Item
                                name="lastPaintingDate"
                                style={{ width: "unset" }}
                                rules={[{ required: true, message: "Please input last painting Date!" }]}
                            >
                                <DatePicker
                                    className="previousPaintinDatePicked"
                                    format={"YYYY/MM/DD"}
                                    size="large"
                                    placeholder="Select previous painting date"
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                        </Row>
                        <Row className="inputRow" justify="center">
                            <Form.Item style={{ width: "unset" }}>
                                <Button className="makePredictionButton" size="large" type="primary" htmlType="submit">
                                    Suggest Painting Date
                                </Button>
                            </Form.Item>
                        </Row>
                    </Col>
                </Row>
            </Form>

            <Row justify="center" className="inputRow predictionBlock">
                {prediction.isPostingPrediction && <LoadingScreen container="fill" />}
                {prediction.nextPaintingDate && (
                    <>
                        {console.log(prediction)}
                        <Col xl={3} lg={3} md={3} sm={3} xs={3} span={3} className="predictionLeftColumn">
                            <Row justify="center" align="middle" className="predictionBlock">
                                <CheckCircleOutlined className="checkIcon" />
                            </Row>
                        </Col>
                        <Col xl={16} lg={16} md={16} sm={16} xs={16} span={12} className="predictionRightColumn">
                            <Row justify="center" align="middle" className="predictionBlock">
                                <Col>
                                    <Row>
                                        <h2>
                                            The system suggests applying a new coating on {prediction.nextPaintingDate}
                                        </h2>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </>
                )}
            </Row>
        </div>
    );
};

export default Predict;
