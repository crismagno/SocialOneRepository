import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// routes
import SplashInit from "../app/SplashInit";
import SignIn from "../app/SignIn";
import SignUp from "../app/SignUp";
import VerifyCode from "../app/VerifyCode";

const Stack = createStackNavigator();

const NavigationAuth: React.FC = (): JSX.Element =>
    <Stack.Navigator 
        initialRouteName="SplashInit" 
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashInit" component={SplashInit} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
    </Stack.Navigator>;

export default NavigationAuth;