import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Logo from "./../../elements/Logo/index";
import styles from "./styles";
import { Button, TextInput } from "react-native-paper";
import { ToastSocial } from "./../../elements/ToastSocial";
import If from "./../../elements/If"
import { user as userService } from "./../../services/index";
import { IUserSignIn } from "../../services/user/types";
import { IUser } from "../../types";
import { errorHandling, validateEmail } from "./../../helpers/global";
import ButtonGradient from "../../elements/ButtonGradient";
import localStorage from "./../../infra/localStorage";
import actionsUser from "./../../reduxStore/actions/user";
import { StateRequestSocial } from "../../helpers/request/StateRequestSocial";

const SignIn: React.FC = (props): JSX.Element  => {

    const {
        setUserOnState 
    } = actionsUser();

    const [user, setUser] = useState<IUserSignIn>({
        email: "",
        password: "",
    });
    const [inputsError, setInputsError] = useState({
        email: "",
        password: "",
    });
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        componentDidMount();
    }, []);

    const componentDidMount = async (): Promise<void> => {
        await localStorage.removeUser();
    };

    const validateInputs = (): boolean => {
        let numInputsInvalid = 0
        for (const key in user) {
            if (user[key].trim() === "") {
                numInputsInvalid++;
                setInputsError(inp => ({ ...inp, [key]: "Field is required"}));
            } else {
                if (key === "email") {
                    if (!validateEmail(user[key])) {
                        numInputsInvalid++;
                        setInputsError(inp => ({ ...inp, email: "E-mail format invalid"}));
                    } else {
                        setInputsError(inp => ({ ...inp, email: ""}));
                    }
                } else {
                    setInputsError(inp => ({ ...inp, [key]: ""}));
                }
            }
        };

        if (numInputsInvalid > 0) {
            ToastSocial({ message: "Fill in the required fields", type: "danger" });
            return true;
        };

        return false;
    };

    const clearUser = (): void => {
        setUser({
            email: "",
            password: "",
        });
    };

    const goToRoute = (route: string): void => {
        props.navigation.navigate(route);
    };

    const signIn = async (): Promise<void> => {
        try {
            if (validateInputs()) return;
            setLoad(true);
            const userResponse: IUser = await userService.signIn(user);
            setUserOnState(userResponse);
            localStorage.setUser(userResponse);
            StateRequestSocial.setTokenState(userResponse.token);
            clearUser();
            ToastSocial({ message: "Login Success" });
            goToRoute("VerifyCode");
        } catch (error) {
            ToastSocial({ message: errorHandling(error), type: "danger" });
        } finally {
            setLoad(false);
        };
    };

    return <View style={styles.container}>
        <View style={styles.containerLogo}>
            <Logo width={200}/>
        </View>

        <TextInput
            style={styles.input}
            onFocus={() => setInputsError(input => ({ ...input, email: "" }))}    
            keyboardType="email-address"
            mode="outlined"
            label="Email"
            value={["user"]["email"]}
            error={!!inputsError.email.trim()}
            onChangeText={text => setUser({ ...user, email: text })}
        />
        <If condition={!!inputsError.email.trim()}>
            <Text style={styles.textRequired}>{inputsError.email}</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => setInputsError(input => ({ ...input, password: "" }))}
            secureTextEntry={true}
            mode="outlined"
            label="Password"
            value={user.password}
            error={!!inputsError.password.trim()}
            onChangeText={text => setUser({ ...user, password: text })}
        />
        <If condition={!!inputsError.password.trim()}>
            <Text style={styles.textRequired}>{inputsError.password}</Text>
        </If>

        <ButtonGradient 
            style={styles.buttonSignIn}
            label="signin"
            toUpperCase={true}
            load={load}
            onPress={() => signIn()}
        />
        <Button
            style={styles.buttonSignUp} 
            onPress={() => goToRoute("SignUp")}>
            Create Account?
        </Button>
    </View>;
};

export default SignIn;