import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

import LoadingScreen from "./LoaderScreen";
import { RootState } from "App/redux/reducers/rootReducer";
import { Roles } from "App/api/account/accountInterfaces";
import { validateSession } from "App/redux/reducers/sessionSlice";
import { mapStateToProps } from "App/redux";

interface ProtectedRouteState {
    isLoading: boolean;
    isUserAuthorized: boolean;
    isUserAuthenticated: boolean;
}

interface OwnProps {
    Component: React.FC<any> | React.ComponentType<any>;
    path: string;
    exact?: boolean;
    acceptedRoles?: Roles[];
}

type ProtectedRouteProps = OwnProps & DispatchProp & RootState & RouteComponentProps;

type LoadingCallback = () => void;

class ProtectedRoute extends React.Component<ProtectedRouteProps, ProtectedRouteState> {
    _isMounted = false;

    constructor(props: ProtectedRouteProps) {
        super(props);

        this.state = {
            isLoading: !props.session.info,
            isUserAuthenticated: true,
            isUserAuthorized: true,
        };
    }

    componentDidMount() {
        this._isMounted = true;

        if (!this.props.session.info) {
            let setStateIsLoading = (value: boolean) => {
                this.setState({
                    isLoading: value,
                });
            };
            let isMounted = (): boolean => this._isMounted;

            this.props.dispatch<any>(validateSession(setStateIsLoading, isMounted));
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { Component, session, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(props) => {
                    if (this.state.isLoading || this.props.session.loadingLogin) {
                        return <LoadingScreen />;
                    } else if (session.info) {
                        return <Component {...this.props} {...props} />;
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: this.props.location,
                                }}
                            />
                        );
                    }
                }}
            />
        );
    }
}

export default connect<RootState, DispatchProp, OwnProps>(mapStateToProps)(ProtectedRoute);
