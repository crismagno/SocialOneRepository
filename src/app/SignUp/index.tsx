import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "./styles";
import { ToastSocial } from "./../../elements/ToastSocial";
import { errorHandling, validateEmail } from "../../helpers/global";
import { IUser, IUserCreate } from "../../types";
import { user as userService } from "./../../services/index";
import localStorage from "./../../infra/localStorage";
import { IndexActionsStore } from "./../../reduxStore/actions";
import { StateRequestSocial } from "../../helpers/request/StateRequestSocial";
import SignUpTop from "./components/Top";
import SignUpCenter from "./components/Center";
import SignUpBottom from "./components/Bottom";

const SignUp: React.FC = (props): JSX.Element  => {

    const {
        actionsUser 
    } = IndexActionsStore();

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
        await localStorage.removeStep();
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
            actionsUser.setUserOnState(userResponse);
            clearUser();
            
            localStorage.setUser(userResponse);
            localStorage.setStep("VerifyCode");
            StateRequestSocial.setTokenState(userResponse.token);
            
            ToastSocial({ message: "Created Success" });
            goToRoute("VerifyCode");
        } catch (error) {
            ToastSocial({ message: errorHandling(error), type: "danger" });
        } finally {
            setLoad(false);
        };
    };

    return <View style={styles.container}>
        <SignUpTop />
        <SignUpCenter 
            user={user}
            setUser={setUser}
            inputsError={inputsError}
            setInputsError={setInputsError}
        />
        <SignUpBottom 
            load={load}
            createUser={createUser}
            goToSignIn={() => goToRoute("SignIn")}
        />
    </View>;
};

export default SignUp;