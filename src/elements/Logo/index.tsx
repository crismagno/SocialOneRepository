import React from "react";
import { Image } from "react-native";
import generalAssets from "../../assets/general/index";
import styles from "./styles";
import { ILogoProps } from "./types";

const { logos } = generalAssets.images;

const Logo: React.FC<ILogoProps> = (props): JSX.Element => {
    const { width, type } = props;
    return <Image 
        style={styles.logo(width)} 
        source={logos[type || 2]}
    />;
};

export default Logo;