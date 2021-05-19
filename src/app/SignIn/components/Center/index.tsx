import React, { useReducer } from "react";
import { Text } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import If from "./../../../../elements/If";
import { ISignInCenterProps } from "./types";
import { IUserSignIn } from "../../../../services/user/types";

const SignInCenter: React.FC<ISignInCenterProps> = (props): JSX.Element => {
    return <>
        <TextInput
            style={styles.input}
            onFocus={() => props.setInputsError(input => ({ ...input, email: "" }))}    
            keyboardType="email-address"
            mode="outlined"
            label="E-mail"
            value={props.user.email}
            error={!!props.inputsError.email.trim()}
            onChangeText={text => props.setUser((userState: IUserSignIn) => ({ ...userState, email: text }))}
        />
        <If condition={!!props.inputsError.email.trim()}>
            <Text style={styles.textRequired}>{props.inputsError.email}</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => props.setInputsError(input => ({ ...input, password: "" }))}
            secureTextEntry={true}
            mode="outlined"
            label="Password"
            value={props.user.password}
            error={!!props.inputsError.password.trim()}
            onChangeText={text => props.setUser((userState: IUserSignIn) => ({...userState, password: text }))}
        />
        <If condition={!!props.inputsError.password.trim()}>
            <Text style={styles.textRequired}>{props.inputsError.password}</Text>
        </If>
    </>;
};

export default SignInCenter;