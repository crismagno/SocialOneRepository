import React from "react";
import { IIfProps } from "./types";

const If: React.FC<IIfProps> = (props): JSX.Element | void => {
    return props.condition && props.children;
};

export default If;