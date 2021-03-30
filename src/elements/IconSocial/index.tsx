import React from "react";
import { IIconParams, IIconProps, IIcons } from "./types";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { setSize } from "../../helpers/responsive/Index";

const icons = (params: IIconParams): IIcons => ({
    person: <Fontisto name="person" size={setSize(params.size)} color={params.color}/>,
    personOutline: <Ionicons name="person-outline" size={setSize(params.size)} color={params.color}/>,
});

const IconSocial: React.FC = (props: IIconProps): JSX.Element => {
    return icons({ 
        size: props.size,
        color: props.color,
    })[props.name];
};

export default IconSocial