// React, React-Router Libraries imports
import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link, RouteChildrenProps } from "react-router-dom";

// Local JS and JSX imports

// Libraries Components imports
import { Button } from "antd";
import {
    HomeOutlined,
    CarOutlined,
    LogoutOutlined,
    MenuOutlined,
    AreaChartOutlined,
    OrderedListOutlined,
} from "@ant-design/icons";

// Funcitons Imports
import { mapStateToProps } from "../redux";
import { devalidateSession } from "App/redux/reducers/sessionSlice";

const Navbar: React.FC<RouteChildrenProps> = (props: RouteChildrenProps) => {
    const menuRef: React.RefObject<HTMLDivElement> = React.createRef();
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(devalidateSession());
    };

    const routeActive = (url: string) => {
        return props.location.pathname.match(url) ? "navbar__btn--active" : "navbar__btn--normal";
    };

    const toggleMenu = () => {
        let menuElement = menuRef.current?.style;
        const menuElementWidth = Number.parseInt(menuElement?.width || "200");

        if (menuElement && menuElementWidth > 0) {
            menuElement.overflow = "hidden";
            menuElement.width = "0";
        } else if (menuElement) {
            menuElement.width = "200px";
            setTimeout(() => {
                menuElement.overflow = "unset";
            }, 500);
        }
    };

    return (
        <div>
            <Button className="hamburger-btn" onClick={toggleMenu}>
                <MenuOutlined />
            </Button>
            <div className="navbar-left" ref={menuRef}>
                <Link to={`${props.match?.url}/home`} className="navbar__link">
                    <Button type="dashed" className={`navbar__btn ${routeActive("home")}`}>
                        <HomeOutlined />
                        Home
                    </Button>
                </Link>
                <Link to={`${props.match?.url}/predict`} className="navbar__link">
                    <Button type="dashed" className={`navbar__btn ${routeActive("predict")}`}>
                        <AreaChartOutlined />
                        Predict
                    </Button>
                </Link>
                <Link to={`${props.match?.url}/ships`} className="navbar__link">
                    <Button type="dashed" className={`navbar__btn ${routeActive("ships")}`}>
                        <OrderedListOutlined />
                        Ships
                    </Button>
                </Link>
                <Button type="dashed" className="navbar__btn navbar__btn--normal" onClick={logOut}>
                    <LogoutOutlined />
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, undefined)(Navbar);
