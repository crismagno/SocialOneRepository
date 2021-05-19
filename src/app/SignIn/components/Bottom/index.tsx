import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Button } from "react-native-paper";
import ButtonGradient from "../../../../elements/ButtonGradient";
import { ISignInBottomProps } from "./types";

const SignInBottom: React.FC<ISignInBottomProps> = (props): JSX.Element  => {
    return <View>
        <ButtonGradient 
            style={styles.buttonSignIn}
            label={"signin"}
            toUpperCase={true}
            load={props.load}
            onPress={props.signIn}
            animationInitial={"fadeIn"}
            animationClick={"pulse"}
        />
        <Button
            style={styles.buttonSignUp} 
            onPress={() => props.signUp()}>
            {"Create Account?"}
        </Button>
    </View>;
};

export default SignInBottom;