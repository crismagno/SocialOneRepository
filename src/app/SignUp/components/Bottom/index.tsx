import React from "react";
import styles from "./styles";
import { Button } from "react-native-paper";
import ButtonGradient from "../../../../elements/ButtonGradient";
import { ISignUpBottomProps } from "./types";

const SignUpBottom: React.FC<ISignUpBottomProps> = (props): JSX.Element  => {
    return <>        
        <ButtonGradient 
            style={styles.buttonCreate}
            label="create"
            toUpperCase={true}
            load={props.load}
            onPress={props.createUser}
            animationInitial={"fadeIn"}
            animationClick={"pulse"}
        />
        <Button
            style={styles.buttonSignIn} 
            onPress={() => props.goToSignIn()}>
            {"Go To SignIn?"}
        </Button>
    </>;
};

export default SignUpBottom;