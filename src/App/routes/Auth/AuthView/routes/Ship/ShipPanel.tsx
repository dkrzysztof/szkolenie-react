import React from "react";
import { ReactComponent as Logo } from "../../../../../assets/vessel.svg";
import { connect, DispatchProp } from "react-redux";
import { RouteChildrenProps, RouteComponentProps } from "react-router";
import { mapStateToProps } from "App/redux";
import { ShipState, RootState } from "App/redux/reducers/rootReducer";
import { shipDetailsStart, fetchShipDetails } from "App/redux/reducers/shipsReducer";
import LoadingScreen from "App/shared/components/LoaderScreen";
import agent from "App/api/agent";
import { Form, Row, Col, Input, Button, Tooltip, DatePicker, notification, Divider, Card } from "antd";

import "./ShipPanel.css";

interface IOwnProps {}

interface IShipState {
    shipId: number;
}

interface IRouteParams {
    ship_id: string;
}

type IShipProps = IOwnProps & RouteComponentProps<IRouteParams> & ShipState & DispatchProp;

class ShipPanel extends React.Component<IShipProps, IShipState> {
    constructor(props: IShipProps) {
        super(props);
        this.state = {
            shipId: Number.parseInt(props.match.params.ship_id),
        };
    }

    componentDidMount() {
        const ship = this.props.selectedShip;

        if (this.state.shipId !== ship.id || !ship.info) {
            this.props.dispatch<any>(fetchShipDetails(this.state.shipId));
        }
    }

    redirectToMovementsPanel() {
        this.props.history.push(`${this.state.shipId}/movements`);
    }

    public render() {
        const ship = this.props.selectedShip;
        console.log(ship);

        // check if data fetching has completed and info object is not null
        if (this.state.shipId === ship.id && !!ship.info && !ship.isFetchingData) {
            return (
                <Row justify="space-between" gutter={32} align="stretch" style={{ height: "100%" }}>
                    {/* Top left panel */}
                    <Col xl={12} sm={24}>
                        <div className="ship-container__box">
                            <Row>
                                {/* General ship status */}
                                <Col xl={12} lg={12} md={24} sm={24} xs={24} span={8}>
                                    <h1 className="customH3tag">{this.props.selectedShip.info.ShipName}</h1>
                                    <h3 className="customPtag" style={{ marginTop: "-0.5em", fontWeight: 400 }}>
                                        SHIP NAME
                                    </h3>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.ShipId}</h3>
                                    <p className="customPtag">SHIP ID</p>
                                </Col>

                                {/* Ship graphic and button to view movements details */}
                                <Col xl={12} lg={12} md={24} sm={24} xs={24} span={8} className="shipImageBlock">
                                    <Logo className="box__ship-image" />
                                </Col>

                                {/* Dodać switcha w zaleznosci od rodzaju inna grafika */}
                            </Row>
                            <Row>
                                <Col xl={12} lg={12} md={24} sm={24} xs={24} span={8}>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.ShipType}</h3>
                                    <p className="customPtag">SHIP TYPE</p>
                                </Col>
                                <Col xl={12} lg={12} md={24} sm={24} xs={24} span={8}>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.Status}</h3>
                                    <p className="customPtag">STATUS</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24} span={0}>
                                    {/* <Card title="NEXT DRY DOCK DATE" extra={<a href="#">PREDICTION SCREEN</a>}>
                                    <h3>{this.props.selectedShip.info.DDNextDate}</h3>
                                </Card> */}
                                    <Card
                                        style={{ marginTop: 0 }}
                                        bodyStyle={{ paddingTop: 2, paddingBottom: 2 }}
                                        headStyle={{ height: 38 }}
                                        type="inner"
                                        title="NEXT DRY DOCK DATE"
                                        extra={<a href="/auth/predict">PREDICTION SCREEN</a>}
                                    >
                                        <h3>{this.props.selectedShip.info.DDNextDate}</h3>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* Top right panel */}
                    <Col xl={12} sm={24}>
                        <div className="ship-container__box">
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} xs={12} span={12}>
                                    <Row>
                                        <h1>General ship info</h1>
                                    </Row>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12} xs={12} span={12}>
                                    <Row justify="end">
                                        <Button onClick={this.redirectToMovementsPanel.bind(this)}>
                                            Go to Movements Panel
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="generalInfoContainer" align="middle">
                                <Col xl={10} lg={10} md={10} sm={10} xs={10} span={10}>
                                    <h4 className="customH3tag">{this.props.selectedShip.info.VesselAge} years</h4>
                                    <p className="customPtag">VESSEL AGE</p>
                                    <Row></Row>
                                    <h4 className="customH3tag">{this.props.selectedShip.info.BuiltDate}</h4>
                                    <p className="customPtag">BUILT DATE</p>
                                </Col>

                                <Col xl={10} lg={10} md={10} sm={10} xs={10} span={10}>
                                    <h4 className="customH3tag">{this.props.selectedShip.info.DDLastDate}</h4>
                                    <p className="customPtag">LAST DRY DOCK DATE</p>
                                    <h4 className="customH3tag">{this.props.selectedShip.info.DDNextDate}</h4>
                                    <p className="customPtag">NEXT DRY DOCK DATE</p>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} span={4} className="blueSideBlock"></Col>
                            </Row>
                        </div>
                    </Col>

                    {/* Bottom panel */}
                    <Col span={24}>
                        <div className="ship-container__box" style={{ height: "auto" }}>
                            <Row>
                                <h1>Detailed ship info</h1>
                            </Row>
                            <Row>
                                <Col xl={7} lg={7} md={24} sm={24} xs={24} span={8}>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.ShipManager}</h3>
                                    <p className="customPtag">SHIP MANAGER</p>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.ShipOwner}</h3>
                                    <p className="customPtag">SHIP ShipOwner</p>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.ShipBuilder}</h3>
                                    <p className="customPtag">SHIP BUILDER</p>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.SalesRepresentative}</h3>
                                    <p className="customPtag">SALES REPRESENTATIVE</p>
                                </Col>

                                <Col style={{ height: "200px" }}>
                                    <Divider type="vertical" style={{ height: "100%" }} />
                                </Col>
                                <Col xl={7} lg={7} md={24} sm={24} xs={24} span={8}>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.CountryOrigin}</h3>
                                    <p className="customPtag">COUNTRY ORIGIN</p>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.RegionOrigin}</h3>
                                    <p className="customPtag">REGION ORIGIN</p>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.ShipOperator}</h3>
                                    <p className="customPtag">SHIP OPERATOR</p>
                                    <h3 className="customH3tag">
                                        {this.props.selectedShip.info.Active ? "ACTIVE" : "INACTIVE"}
                                    </h3>
                                    <p className="customPtag">STATECODE</p>
                                </Col>

                                <Col style={{ height: "200px" }}>
                                    <Divider type="vertical" style={{ height: "100%" }} />
                                </Col>
                                <Col xl={7} lg={7} md={24} sm={24} xs={24} span={8}>
                                    <h3 className="customH3tag">{this.props.selectedShip.info.TechnicalManager}</h3>
                                    <p className="customPtag">TECHNICAL MANAGER</p>
                                    <h3 className="customH3tag">
                                        {this.props.selectedShip.info.TechnicalManagerCountry}
                                    </h3>
                                    <p className="customPtag">TECHNICAL MANAGER COUNTRY</p>
                                    <h3 className="customH3tag">
                                        {this.props.selectedShip.info.TechnicalManagerRegion}
                                    </h3>
                                    <p className="customPtag">TECHNICAL MANAGER REGION</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            );
        } else {
            return <LoadingScreen container="fill" />;
        }
    }
}

export default connect((state: RootState) => state.ships)(ShipPanel);
