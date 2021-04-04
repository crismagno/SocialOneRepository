import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "../../elements/Logo";
import styles from "./styles";
import localStorage from "./../../infra/localStorage";
import actionsUserStore from "./../../reduxStore/actions/user";
import { StateRequestSocial } from "../../helpers/request/StateRequestSocial";
import actionsNavigation from "./../../navigation/actions"

const SplashInit: React.FC = (props): JSX.Element => {

    const {
        setUserOnState 
    } = actionsUserStore();

    const execActionsNavigation = actionsNavigation(props);
    
    useEffect(() => {
        setTimeout(() => {
            verifySessionUser();
        }, 2000);
    }, []);
    
    const goToRoute = (route: string): void => {
        execActionsNavigation.resetHistory(route);
    };

    const verifySessionUser = async (): Promise<void> => {
        const userLocalStorage = await localStorage.getUser();
        if (!!userLocalStorage) {
            setUserOnState(userLocalStorage);
            StateRequestSocial.setTokenState(userLocalStorage.token);
            goToRoute("VerifyCode");
        } else {
            goToRoute("SignIn");
        }
    };

    return <View style={styles.container}>
        <Logo width={200}/>
    </View>;
};

export default SplashInit;
