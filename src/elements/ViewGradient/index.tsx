import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { colorsSocial } from "../../assets/general";
import { IViewGradientProps } from "./types";

export const ViewGradient: React.FC<IViewGradientProps> = (props): JSX.Element => {
    return <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 3.0}}
        locations={[0.3, 1.5]}
        colors={props?.colors || [colorsSocial.colorA4, colorsSocial.colorA3]}
        style={props.style}
    >
        {props.children}
    </LinearGradient>
 
};

export default ViewGradient;