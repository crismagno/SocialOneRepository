import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Logo from "../../elements/Logo/index";
import styles from "./styles";
import { Button, TextInput } from "react-native-paper"; 
import { ToastSocial } from "./../../elements/ToastSocial";
import If from "./../../elements/If"
import { errorHandling, validateEmail } from "../../helpers/global";
import { IUser, IUserCreate } from "../../types";
import { user as userService } from "./../../services/index";
import TextInputMask from "react-native-text-input-mask";
import ButtonGradient from "../../elements/ButtonGradient";
import localStorage from "./../../infra/localStorage";
import actionsUser from "./../../reduxStore/actions/user";
import { StateRequestSocial } from "../../helpers/request/StateRequestSocial";

const SignUp: React.FC = (props): JSX.Element  => {

    const {
        setUserOnState 
    } = actionsUser();

    const [user, setUser] = useState<IUserCreate>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
    });
    const [inputsError, setInputsError] = useState({
        fullName: "",
        email: "",
        phone: "",
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
                setInputsError(inp => ({ ...inp, [key]: "Field required"}));
            } else {
                if (key === "email") {
                    if (!validateEmail(user[key])) {
                        numInputsInvalid++;
                        setInputsError(inp => ({ ...inp, email: "E-mail format invalid"}));
                    } else {
                        setInputsError(inp => ({ ...inp, email: ""}));
                    }
                } else if (key === "phone"){
                    if (user[key].length < 20) {
                        numInputsInvalid++;
                        setInputsError(inp => ({ ...inp, phone: "Phone format invalid"}));
                    } else {
                        setInputsError(inp => ({ ...inp, phone: ""}));
                    }
                } else {
                    setInputsError(inp => ({ ...inp, [key]: ""}));
                }
            }
        };

        if (numInputsInvalid > 0) {
            ToastSocial({ message: "Fill in the required fields", type: "danger" });
            return true;
        }

        return false;
    };

    const clearUser = (): void => {
        setUser({
            fullName: "",
            email: "",
            phone: "",
            password: "",
        });
    };

    const goToRoute = (route: string): void => {
        props.navigation.navigate(route);
    };

    const createUser = async (): Promise<void> => {
        try {
            if (validateInputs()) return;
            setLoad(true);
            const userResponse: IUser = await userService.signUp(user);
            setUserOnState(userResponse);
            localStorage.setUser(userResponse);
            StateRequestSocial.setTokenState(userResponse.token);
            ToastSocial({ message: "Created Success" });
            clearUser();
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
            onFocus={() => setInputsError(input => ({ ...input, fullName: "" }))}
            mode="outlined"
            label="Full Name"
            value={user.fullName}
            error={!!inputsError.fullName.trim()}
            onChangeText={text => setUser({ ...user, fullName: text })}
        />
        <If condition={!!inputsError.fullName.trim()}>
            <Text style={styles.textRequired}>{inputsError.fullName}</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => setInputsError(input => ({ ...input, email: "" }))}
            keyboardType="email-address"
            mode="outlined"
            label="Email"
            value={user.email}
            error={!!inputsError.email.trim()}
            onChangeText={text => setUser({ ...user, email: text })}
        />
        <If condition={!!inputsError.email.trim()}>
            <Text style={styles.textRequired}>{inputsError.email}</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => setInputsError(input => ({ ...input, phone: "" }))}
            keyboardType="phone-pad"
            mode="outlined"
            label="Phone"
            value={user.phone}
            placeholder="+55 (99) 9 9999-9999"
            error={!!inputsError.phone.trim()}
            onChangeText={text => setUser({ ...user, phone: text })}
            render={props => <TextInputMask {...props} mask="+[00] ([00]) [0] [0000]-[0000]" />}
        />
        <If condition={!!inputsError.phone.trim()}>
            <Text style={styles.textRequired}>{inputsError.phone.trim()}</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => setInputsError(input => ({ ...input, password: "" }))}
            mode="outlined"
            label="Password"
            secureTextEntry={true}
            value={user.password}
            error={!!inputsError.password.trim()}
            onChangeText={text => setUser({ ...user, password: text })}
        />
        <If condition={!!inputsError.password.trim()}>
            <Text style={styles.textRequired}>{inputsError.password}</Text>
        </If>

        <ButtonGradient 
            style={styles.buttonCreate}
            label="create"
            toUpperCase={true}
            load={load}
            onPress={() => createUser()}
        />
        <Button
            style={styles.buttonSignIn} 
            onPress={() => goToRoute("SignIn")}>
            Go To SignIn?
        </Button>
    </View>;
};

export default SignUp;