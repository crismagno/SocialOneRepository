import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "../../elements/Logo";
import styles from "./styles";
import localStorage from "./../../infra/localStorage";
import { IndexActionsStore } from "./../../reduxStore/actions";
import { StateRequestSocial } from "../../helpers/request/StateRequestSocial";
import actionsNavigation from "./../../navigation/actions";
import { TRouteRedirect, TStepApp } from "../../types";
import { user as userService } from "./../../services";

const SplashInit: React.FC = (props): JSX.Element => {

    const {
       actionsUser 
    } = IndexActionsStore();

    // actions navigation witch reset routes
    const execActionsNavigation = actionsNavigation(props);
    
    useEffect(() => {
        setTimeout(() => {
            verifySessionUser();
        }, 2000);
    }, []);
    
    const goToRoute = (route: TRouteRedirect): void => {
        execActionsNavigation.resetHistory(route);
    };

    const verifySessionUser = async (): Promise<void> => {

        /* verify if user is localStorage Session 
        * if user is session, make request to validate user exists on database
        * else user not redirect to signIn
        * if user exists on database verify "step fo localStorage Session"
        */
        const userLocalStorage = await localStorage.getUser();
        if (!!userLocalStorage) {
            
            // fazer requisição e se usuario não existir jogar pra tela de login
            StateRequestSocial.setTokenState(userLocalStorage.token); // insert in class de StateRequest

            actionsUser.setUserOnState(userLocalStorage); // insert on user store redux
             
            // userService
            //     .getUserById(userLocalStorage._id)
            //     .then(user => {
            //         actionsUser.setUserOnState(user);            
            //     }); 

            const stepLocalStorage: TStepApp = await localStorage.getStep(); 

            if (stepLocalStorage === "VerifyCode") {
                goToRoute("VerifyCode");
                return;    
            }

            if (stepLocalStorage === "App") {
                goToRoute("App");
                return;    
            }

            goToRoute("SignIn");
            return;
        }
        
        goToRoute("SignIn");
        return;
    };

    return <View style={styles.container}>
        <Logo/>
    </View>;
};

export default SplashInit;