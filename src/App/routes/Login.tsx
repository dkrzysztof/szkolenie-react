import React from "react";
import { connect } from "react-redux";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";

import { mapStateToProps } from "../redux";
import LoadingScreen from "App/shared/components/LoaderScreen";
import { DispatchProp } from "react-redux";
import { RootState } from "App/redux/reducers/rootReducer";
import { Store } from "antd/lib/form/interface";
import { LoginRequest } from "App/api/account/accountInterfaces";
import { authenticateUser, devalidateSession } from "App/redux/reducers/sessionSlice";
import { RouteChildrenProps } from "react-router-dom";

interface LoginState {
    isSpinning: boolean;
    emitResponse: boolean;
    serverResponse: string;
}

type LoginProps = DispatchProp & RootState & RouteChildrenProps;

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
    }
    submitLoginCredentials = (values: Store) => {
        let redirectOnSuccess = () => {
            this.props.history.push("/auth/home");
        };
        let credentials = {
            username: "AdminLogin",
            password: "AdminPassword",
        } as LoginRequest;

        this.props.dispatch<any>(authenticateUser(credentials, redirectOnSuccess));
    };

    logOut = () => {
        this.props.dispatch(devalidateSession());
    };

    render() {
        return (
            <div className="center">
                {this.props.session.loadingLogin ? <LoadingScreen /> : undefined}
                <div className="container">
                    <div className="left-panel">
                        <h1 className="title">Sailing Around The World</h1>
                        <h4 className="subtitle">Data Science Project</h4>
                        <hr></hr>
                        <hr></hr>
                    </div>
                    <div className="right-panel">
                        <h1 className="title">Sign In</h1>
                        <Form
                            className="login-form"
                            onFinish={this.submitLoginCredentials}
                            size="large"
                            autoComplete="off"
                        >
                            <Form.Item
                                name="username"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "Please input your Username!",
                                //     },
                                // ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: "Please input your Password!",
                                //     },
                                // ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                {
                                    //<a className="login-form-forgot" href="#">}
                                }
                                Forgot password
                            </Form.Item>
                            {this.props.session.error ? (
                                <h4 className="text-danger">{this.props.session.error}</h4>
                            ) : undefined}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect<RootState, DispatchProp, {}>(mapStateToProps)(Login);
