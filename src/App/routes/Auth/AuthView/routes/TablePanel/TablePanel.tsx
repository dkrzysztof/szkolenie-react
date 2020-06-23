import React, { Dispatch } from "react";
import {
    Menu,
    Table,
    Modal,
    Button,
    Input,
    Tag,
    Col,
    Row,
    InputNumber,
    DatePicker,
    AutoComplete,
    Cascader,
    Tooltip,
} from "antd";

import { ShipShortEntity, IShipsFilterParams } from "App/api/ships/shipInterfaces";
import { useSelector, useDispatch, DispatchProp, connect } from "react-redux";
import { RootState, ShipState } from "App/redux/reducers/rootReducer";
import { fetchShips, setSelectedShip, IPagination } from "App/redux/reducers/shipsReducer";
import { mapStateToProps } from "App/redux";
import { RouteComponentProps } from "react-router";
import { ProfileOutlined, SearchOutlined } from "@ant-design/icons";
import Column from "antd/lib/table/Column";
import { validationFailure } from "App/redux/reducers/sessionSlice";

const columns = [
    { key: "ShipId", dataIndex: "shipId", title: "ID" },
    { key: "ShipName", dataIndex: "shipName", title: "Ship Name" },
    { key: "ShipType", dataIndex: "shipType", title: "Ship Type" },
    { key: "Status", dataIndex: "status", title: "Status" },
    { key: "VesselAge", dataIndex: "vesselAge", title: "Vessel Age" },
    { key: "ShipManager", dataIndex: "shipManager", title: "Ship Manager" },
    { key: "ShipOwner", dataIndex: "shipOwner", title: "Ship Owner" },
    { key: "SalesRep", dataIndex: "salesRep", title: "Sales Representative" },
];

interface OwnProps {}

interface TablePanelState {
    data: ShipShortEntity[];
    pagination: IPagination;
    loading: boolean;
    shipId: string;
    shipName: string;
    shipType: string;
    status: string;
    shipManager: string;
    shipOwner: string;
    shipAge: string;
    shipRepresentative: string;
}

type TablePanelProps = OwnProps & DispatchProp & ShipState & RouteComponentProps;

class TablePanel extends React.Component<TablePanelProps, TablePanelState> {
    constructor(props: TablePanelProps) {
        super(props);

        this.state = {
            data: props.ships,
            pagination: {
                current: 1,
                pageSize: props.pagination.pageSize,
                total: props.pagination.total,
            },
            loading: props.isFetchingData,
            shipId: "",
            shipName: "",
            shipType: "",
            status: "",
            shipManager: "",
            shipOwner: "",
            shipAge: "",
            shipRepresentative: "",
        };
    }

    static getDerivedStateFromProps(props: TablePanelProps, state: TablePanelState) {
        return { pagination: props.pagination, data: props.ships };
    }

    componentDidMount() {
        if (!this.state.data && !this.props.isFetchingData) {
            this.props.dispatch<any>(
                fetchShips(this.state.pagination, {
                    "ship-id": 5065160,
                })
            );
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.props.dispatch<any>(fetchShips(pagination));
        this.setState({
            pagination: {
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
            },
        });
    };

    handleTableSearch = () => {
        let val: IShipsFilterParams = {};

        if (this.state.shipId !== "") {
            val["ship-id"] = Number(this.state.shipId);
        }

        if (this.state.shipName !== "") {
            val["ship-name"] = this.state.shipName;
        }

        if (this.state.shipType !== "") {
            val["ship-type"] = this.state.shipType;
        }

        if (this.state.status !== "") {
            val["status"] = this.state.status;
        }

        if (this.state.shipManager !== "") {
            val["ship-manager"] = this.state.shipManager;
        }

        if (this.state.shipOwner !== "") {
            val["ship-owner"] = this.state.shipOwner;
        }

        if (this.state.shipAge !== "") {
            val["vessel-age"] = Number(this.state.shipAge);
        }

        if (this.state.shipRepresentative !== "") {
            val["sales-rep"] = this.state.shipRepresentative;
        }

        this.props.dispatch<any>(fetchShips(this.state.pagination, val));
    };

    redirectToShipPanelFromButton = (event) => {
        this.props.history.push(`ships/${this.props.selectedShip.id}`);
    };

    redirectToShipPanelFromDoubleClick = (record: ShipShortEntity) => {
        this.props.history.push(`ships/${record.shipId}`);
    };

    render() {
        return (
            <div className="panel">
                <Row justify="center">
                    <h1>Ships</h1>
                </Row>
                <div style={{ width: "auto", margin: "auto" }}>
                    <Row justify="center" align="middle">
                        <Col>
                            <Input.Group size="large">
                                <Row gutter={8}>
                                    <Col span={5}>
                                        <Input
                                            placeholder="Ship Id"
                                            onChange={(val) => {
                                                this.setState({
                                                    shipId: val.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <Input
                                            placeholder="Ship Name"
                                            onChange={(val) => {
                                                this.setState({
                                                    shipName: val.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <Input
                                            placeholder="Ship Type"
                                            onChange={(val) => {
                                                this.setState({
                                                    shipType: val.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <Input
                                            placeholder="Status"
                                            onChange={(val) => {
                                                this.setState({
                                                    status: val.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row gutter={8} style={{ marginTop: 5 }}>
                                    <Col span={5}>
                                        <Input
                                            placeholder="Ship Manager"
                                            onChange={(val) => {
                                                this.setState({
                                                    shipManager: val.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <Input
                                            placeholder="Ship Owner"
                                            onChange={(val) => {
                                                this.setState({
                                                    shipOwner: val.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <Input
                                            placeholder="Ship Age"
                                            onChange={(val) => {
                                                this.setState({
                                                    shipAge: val.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <Input
                                            placeholder="Ship Representative"
                                            onChange={(val) => {
                                                this.setState({
                                                    shipRepresentative: val.target.value,
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Input.Group>
                        </Col>
                        <Col>
                            <Row align="middle" justify="center">
                                <Button type="primary" icon={<SearchOutlined />} onClick={this.handleTableSearch}>
                                    Search
                                </Button>
                            </Row>
                        </Col>
                    </Row>

                    {/* </Input.Group> */}
                </div>
                <br />
                <Table
                    rowSelection={{
                        type: "radio",
                        onSelect: (record: ShipShortEntity, selected: boolean, selectedRows: ShipShortEntity[]) => {
                            let [selectedShip] = selectedRows;
                            this.props.dispatch(setSelectedShip(selectedShip.shipId));
                        },
                    }}
                    columns={columns}
                    pagination={this.state.pagination}
                    dataSource={this.state.data}
                    loading={this.props.isFetchingData}
                    onChange={this.handleTableChange}
                    rowKey={(record) => record.shipId}
                    onRow={(record: ShipShortEntity, rowIndex) => {
                        return {
                            onMouseEnter: (event) => {
                                event.currentTarget.style.cursor = "pointer";
                            },
                            onDoubleClick: (event) => {
                                this.props.dispatch(setSelectedShip(record.shipId));
                                this.redirectToShipPanelFromDoubleClick(record);
                            },
                        };
                    }}
                />

                <Button disabled={!this.props.selectedShip.id} onClick={this.redirectToShipPanelFromButton}>
                    <ProfileOutlined />
                    Ship Details
                </Button>
            </div>
        );
    }
}

export default connect((state: RootState) => state.ships)(TablePanel);
