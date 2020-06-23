import React, { CSSProperties } from "react";
import { Spin } from "antd";

export declare type ContainerType = "screen" | "fill";

interface ILoaderScreenProps {
    container?: ContainerType;
}
export default function LoadingScreen(props: ILoaderScreenProps) {
    let style: CSSProperties = {};

    if (props.container === "screen") {
        style = {
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 999,
        };
    }
    if (props.container === "fill") {
        style = {
            width: "100%",
            height: "100%",
            position: "inherit",
            overflow: "hidden",
        };
    }

    return (
        <div className="overlay" style={style}>
            <Spin size="large" />
        </div>
    );
}
