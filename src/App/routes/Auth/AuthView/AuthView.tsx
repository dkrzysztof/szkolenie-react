// React, React-Router Libraries imports
import React from "react";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import { connect } from "react-redux";

// Local JS and JSX imports
import ProtectedRoute from "App/shared/components/ProtectedRoute";
import ShipPanel from "./routes/Ship/ShipPanel";
import Home from "./routes/Home/Home";
import TableView from "./routes/TablePanel/TablePanel";
import Navbar from "App/shared/Navbar";

// Libraries Components imports

// Styles Imports
import "./AuthView.css";

// Funcitons Imports
import { mapStateToProps } from "App/redux";
import Predict from "./routes/Predict/Predict";
import MovementPanel from "./routes/MovementPanel/MovementPanel";

const AuthView: React.FC<RouteChildrenProps> = (props: RouteChildrenProps) => {
    const { location, match, history } = props;
    const routeProps = {
        location,
        match,
        history,
    };
    return (
        <div className="home">
            <Navbar {...props} />
            <div className="main-panel">
                <ProtectedRoute path={props.match?.url + "/home"} exact Component={Home} {...routeProps} />
                <ProtectedRoute path={props.match?.url + "/ships"} exact Component={TableView} {...routeProps} />
                <ProtectedRoute
                    path={props.match?.url + "/ships/:ship_id"}
                    exact
                    Component={ShipPanel}
                    {...routeProps}
                />
                <ProtectedRoute
                    path={props.match?.url + "/ships/:ship_id/movements"}
                    exact
                    Component={MovementPanel}
                    {...routeProps}
                />
                <ProtectedRoute path={props.match?.url + "/predict"} exact Component={Predict} {...routeProps} />
                <Redirect to={routeProps.location.pathname} />
            </div>
        </div>
    );
};

export default connect(mapStateToProps, undefined)(AuthView);
