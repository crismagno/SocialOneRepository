import React, { memo } from "react";
import { Image } from "react-native";
import generalAssets from "../../assets/general/index";
import styles from "./styles";
import { ILogoProps } from "./types";

const { logos } = generalAssets.images;

export const Logo: React.FC<ILogoProps> = (props): JSX.Element => {
    const { width, height, type } = props;
    return <Image 
        style={styles.logo(width, height)} 
        source={logos[type || 2]}
    />;
};

export default memo(Logo);