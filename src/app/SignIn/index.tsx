import React, { useState } from "react";
import { View, Text } from "react-native";
import Logo from "./../../elements/Logo/index";
import styles from "./styles";
import { Button, TextInput } from "react-native-paper"
import { Toast } from "./../../elements/ToastSocial";
import If from "./../../elements/If"
import  { user as userService }  from "./../../services/index";
import { IUserSignIn } from "../../services/user/types";
import { IUser } from "../../types";
import { errorHandling, validateEmail } from "./../../helpers/global";

const SignIn: React.FC = (props): JSX.Element  => {

    const [user, setUser] = useState<IUserSignIn>({
        email: "",
        password: "",
    });

    const [inputs, setInputs] = useState({
        email: false,
        emailFormat: false,
        password: false,
    });

    const validateInputs = () => {
        let numInputsInvalid = 0
        for (const key in user) {
            if (user[key].trim() === "") {
                numInputsInvalid++;
                setInputs(inp => ({ ...inp, [key]: true}));
            } else {
                if (key === "email") {
                    if (!validateEmail(user[key])) {
                        numInputsInvalid++;
                        setInputs(inp => ({ ...inp, email: false, emailFormat: true}));
                    } else {
                        setInputs(inp => ({ ...inp, email: false, emailFormat: false}));
                    }
                } else {
                    setInputs(inp => ({ ...inp, [key]: false}));
                }
            }
        };

        if (numInputsInvalid > 0) {
            Toast("Fill in the required fields", 1000, true);
            return true;
        };

        return false;
    };

    const clearUser = () => {
        setUser({
            email: "",
            password: "",
        });
    };

    const signIn = async () => {
        try {
            if (validateInputs()) return false;
            const userResponse: IUser = await userService.signIn(user);
            clearUser();
            Toast("Login with success!");
        } catch (error) {
            Toast(errorHandling(error), 2000, true);
        };
    };

    return <View style={styles.container}>
        <View style={styles.containerLogo}>
            <Logo/>
        </View>

        <TextInput
            style={styles.input}
            onFocus={() => setInputs(input => ({ ...input, email: false, emailFormat: false }))}    
            keyboardType="email-address"
            mode="outlined"
            label="Email"
            value={user.email}
            error={inputs.email || inputs.emailFormat}
            onChangeText={text => setUser({ ...user, email: text })}
        />
        <If condition={inputs.email}>
            <Text style={styles.textRequired}>Email is required</Text>
        </If>
        <If condition={inputs.emailFormat}>
            <Text style={styles.textRequired}>Format email is invalid</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => setInputs(input => ({ ...input, password: false }))}
            secureTextEntry={true}
            mode="outlined"
            label="Password"
            value={user.password}
            error={inputs.password}
            onChangeText={text => setUser({ ...user, password: text })}
        />
        <If condition={inputs.password}>
            <Text style={styles.textRequired}>Password is required</Text>
        </If>

        <Button 
            style={styles.buttonSignIn}
            mode="contained" 
            onPress={() => signIn()}>
            <Text style={styles.textCreate}>SignIn</Text>
        </Button>
        <Button
            style={styles.buttonSignUp} 
            onPress={() => props.navigation.navigate("SignUp")}>
            Create Account?
        </Button>
    </View>;
};

export default SignIn;