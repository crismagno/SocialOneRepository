import React from "react";
import { View } from "react-native";
import Logo from "../../../../elements/Logo";
import styles from "./styles";
import * as Animatable from "react-native-animatable";

const SignInTop: React.FC = (props): JSX.Element => {
    return <View style={styles.containerLogo}>
        <Animatable.View 
            animation={"fadeIn"}
            duration={1000}>
            <Logo />
        </Animatable.View>
    </View>
};

export default SignInTop;