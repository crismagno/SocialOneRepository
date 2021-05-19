import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import If from "./../../../../elements/If";
import TextInputMask from "react-native-text-input-mask";
import { ISignUpCenterProps } from "./types";

const SignUpCenter: React.FC<ISignUpCenterProps> = (props): JSX.Element  => {

    return <>        
        <TextInput
            style={styles.input}
            onFocus={() => props.setInputsError(input => ({ ...input, fullName: "" }))}
            mode="outlined"
            label="Full Name"
            value={props.user.fullName}
            error={!!props.inputsError.fullName.trim()}
            onChangeText={text => props.setUser({ ...props.user, fullName: text })}
        />
        <If condition={!!props.inputsError.fullName.trim()}>
            <Text style={styles.textRequired}>{props.inputsError.fullName}</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => props.setInputsError(input => ({ ...input, email: "" }))}
            keyboardType="email-address"
            mode="outlined"
            label="E-mail"
            value={props.user.email}
            error={!!props.inputsError.email.trim()}
            onChangeText={text => props.setUser({ ...props.user, email: text })}
        />
        <If condition={!!props.inputsError.email.trim()}>
            <Text style={styles.textRequired}>{props.inputsError.email}</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => props.setInputsError(input => ({ ...input, phone: "" }))}
            keyboardType="phone-pad"
            mode="outlined"
            label="Phone"
            value={props.user.phone}
            placeholder="+55 (99) 9 9999-9999"
            error={!!props.inputsError.phone.trim()}
            onChangeText={text => props.setUser({ ...props.user, phone: text })}
            render={props => <TextInputMask {...props} mask="+[00] ([00]) [0] [0000]-[0000]" />}
        />
        <If condition={!!props.inputsError.phone.trim()}>
            <Text style={styles.textRequired}>{props.inputsError.phone.trim()}</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => props.setInputsError(input => ({ ...input, password: "" }))}
            mode="outlined"
            label="Password"
            secureTextEntry={true}
            value={props.user.password}
            error={!!props.inputsError.password.trim()}
            onChangeText={text => props.setUser({ ...props.user, password: text })}
        />
        <If condition={!!props.inputsError.password.trim()}>
            <Text style={styles.textRequired}>{props.inputsError.password}</Text>
        </If>
    </>;
};

export default SignUpCenter;