import React from "react";
import { View } from "react-native";
import Logo from "../../../../elements/Logo/index";
import styles from "./styles";

const SignUpTop: React.FC = (props): JSX.Element  => {

    return <View style={styles.containerLogo}>
        <Logo type={3} width={120} height={140} />
    </View>
};

export default SignUpTop;