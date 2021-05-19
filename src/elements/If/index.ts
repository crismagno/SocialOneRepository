import React from "react";
import { IIfProps } from "./types";

const If: React.FC<IIfProps> = (props): JSX.Element | any => {
    return props.condition && props.children || null;
};

export default If;