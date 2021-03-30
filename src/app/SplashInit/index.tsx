import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "../../elements/Logo";
import styles from "./styles";

const SplashInit: React.FC = (props): JSX.Element => {

    useEffect(() => {
        setTimeout(() => {
            goRoute();
        }, 2000);
    }, []);
    
    const goRoute = (): void => {
        props.navigation.navigate("SignIn");
    };

    return <View style={styles.container}>
        <Logo/>
    </View>;
};

export default SplashInit;
