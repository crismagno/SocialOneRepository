import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "./styles";
import { ToastSocial } from "./../../elements/ToastSocial";
import { user as userService } from "./../../services/index";
import { IUserSignIn } from "../../services/user/types";
import { IUser } from "../../types";
import { errorHandling, validateEmail } from "./../../helpers/global";
import localStorage from "./../../infra/localStorage";
import { IndexActionsStore } from "./../../reduxStore/actions";
import { StateRequestSocial } from "../../helpers/request/StateRequestSocial";
import SignInTop from "./components/Top";
import SignInCenter from "./components/Center";
import SignInBottom from "./components/Bottom";

const SignIn: React.FC = (props): JSX.Element  => {

    const {
        actionsUser 
    } = IndexActionsStore();

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
        await localStorage.removeStep();
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

            actionsUser.setUserOnState(userResponse);
            clearUser();
            
            localStorage.setUser(userResponse);
            localStorage.setStep("VerifyCode");
            StateRequestSocial.setTokenState(userResponse.token);
            
            ToastSocial({ message: "Login Success" });
            goToRoute("VerifyCode");
        } catch (error) {
            ToastSocial({ message: errorHandling(error), type: "danger" });
        } finally {
            setLoad(false);
        };
    };

    return <View style={styles.container}>
        <SignInTop />
        <SignInCenter 
            user={user}
            setUser={setUser}
            inputsError={inputsError}
            setInputsError={setInputsError}
        />
        <SignInBottom 
            load={load}
            signIn={() => signIn()}
            signUp={() => goToRoute("SignUp")}
        />
    </View>;
};

export default SignIn;