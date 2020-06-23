import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { RootState, ShipState } from "App/redux/reducers/rootReducer";
import { RouteComponentProps } from "react-router";
import { ShipMovementArray, ShipEntity } from "App/api/ships/shipInterfaces";
import { IPagination, setSelectedShip, fetchShipDetails } from "App/redux/reducers/shipsReducer";
import agent from "App/api/agent";
import { AxiosError } from "axios";
import { Form, Row, Col, Input, Button, Tooltip, DatePicker, notification, Divider, Card, Table } from "antd";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import MapChart from "./MapChart";
import LoadingScreen from "App/shared/components/LoaderScreen";
import { IPorts } from "App/api/ports/portsInterfaces";
import { parseMovements } from "App/shared/components/Utilites";

interface IOwnProps {}
interface IMovementPanelState {
    isFetchingMovements: boolean;
    movements: any;
    movementsLength: number;
    pagination: IPagination;
    shipId: number;
    ship: ShipEntity | null;
    isFetchingShip: boolean;
}
interface IRouteParams {
    ship_id: string;
}

const columns = [
    {
        title: "Port Name",
        dataIndex: "name",
    },
    {
        title: "From Port",
        dataIndex: "PortFrom",
    },
    {
        title: "From Country",
        dataIndex: "CountryFrom",
    },
    {
        title: " Port Destination",
        dataIndex: "PortDestination",
    },
    {
        title: "Arrival Date",
        dataIndex: "PortArrivalDate",
    },
    {
        title: "Sail Date",
        dataIndex: "SailDate",
    },
    {
        title: "Longitute",
        dataIndex: "PortLongitudeDecimal",
    },
    {
        title: "Latitude",
        dataIndex: "PortLatitudeDecimal",
    },
];

var geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

type IMovementPanelProps = IOwnProps & RouteComponentProps<IRouteParams> & DispatchProp & ShipState;

class MovementPanel extends Component<IMovementPanelProps, IMovementPanelState> {
    constructor(props: IMovementPanelProps) {
        super(props);

        this.state = {
            shipId: Number.parseInt(props.match.params.ship_id),
            ship: this.props.selectedShip.info || null,
            isFetchingShip: !!this.props.selectedShip.info,
            isFetchingMovements: false,
            movements: null,
            movementsLength: 0,
            pagination: {
                current: 0,
                pageSize: 10,
                total: 100,
            },
        };
    }

    componentDidMount() {
        if (!this.state.ship) {
            this.fetchShipData();
        } else if (!this.state.movements) {
            this.fetchMovements();
        }
    }

    componentDidUpdate() {
        if (!this.state.ship) {
            this.fetchShipData();
        } else if (!this.state.movements && !this.state.isFetchingMovements) {
            this.fetchMovements();
        }
    }

    fetchShipData() {
        this.props.dispatch<any>(fetchShipDetails(this.state.shipId));
        agent.Ships.getShipDetails(this.state.shipId)
            .then((res: ShipEntity) => {
                this.setState({
                    ship: res,
                    isFetchingShip: false,
                });
                this.props.dispatch<any>(setSelectedShip(this.state.shipId));
            })
            .catch((err) => {
                this.setState({
                    isFetchingShip: false,
                });
                notification.error({
                    message: "An Error occured",
                    description: err.message,
                    placement: "bottomRight",
                });
            });
    }

    fetchMovements() {
        this.setState({
            isFetchingMovements: true,
        });
        agent.Ships.getShipAllRoutes(this.state.shipId, { pageNumber: 1, pageSize: 1000 })
            .then((movements: ShipMovementArray) => {
                parseMovements(movements, this.state.ship).then((res) => {
                    this.setState({
                        isFetchingMovements: false,
                        movements: res,
                        movementsLength: movements.length || res.length,
                    });
                });
            })
            .catch((err: any) => {
                this.setState({
                    isFetchingMovements: false,
                });
                notification.error({
                    message: "An Error occured",
                    description: err.description,
                    placement: "bottomRight",
                });
            });
    }

    render() {
        const Data = {
            fontSize: "1.2em",
        };

        if (!this.state.isFetchingMovements && this.state.movements && this.state.ship) {
            return (
                <Row align="top" style={{ height: "100%", paddingRight: "1em" }}>
                    <Col span={24} style={{ marginTop: "1em" }}>
                        <Row
                            gutter={[16, 16]}
                            align="middle"
                            justify="space-around"
                            style={{ marginBottom: "1em", height: "auto" }}
                        >
                            <Col lg={24}>
                                <div className="panel" style={{ padding: 0, height: "auto" }}>
                                    <h4 className="title" style={{ marginBottom: "0.25em" }}>
                                        {this.state.ship.ShipName}
                                    </h4>
                                    <h4 className="subtitle-ov" style={{ ...Data, paddingLeft: "3em" }}>
                                        SHIP NAME
                                    </h4>
                                    <Row justify="center" style={{ marginBottom: "2em" }}>
                                        <Col span={18}>
                                            <Divider>
                                                <h2>Movements</h2>
                                            </Divider>
                                            <Row justify="center" align="middle">
                                                <Col xs={10} md={8} xl={8}>
                                                    <h4 className="title-no">{this.state.movementsLength}</h4>
                                                    <h4 className="subtitle-ov" style={Data}>
                                                        TOTAL MOVEMENTS
                                                    </h4>
                                                </Col>
                                                <Col xs={10} md={8} xl={8}>
                                                    <h4 className="title-no">
                                                        {this.state.movements.length
                                                            ? this.state.movements[0].PortFrom
                                                            : "N/D"}
                                                    </h4>
                                                    <h4 className="subtitle-ov" style={Data}>
                                                        LAST PORT
                                                    </h4>
                                                </Col>
                                            </Row>
                                            <Divider />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col lg={24}>
                                <Row justify="center" align="middle" style={{ height: "100%" }}>
                                    <Col span={22}>
                                        <div
                                            className="panel"
                                            style={{ padding: 0, maxHeight: "800px", overflowY: "hidden" }}
                                        >
                                            <MapChart dataSource={this.state.movements} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        } else {
            return (
                <div style={{ width: "100%", height: "100%" }}>
                    <LoadingScreen container="fill" />
                </div>
            );
        }
    }
}

export default connect((state: RootState) => state.ships)(MovementPanel);
