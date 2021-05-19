import React, { useEffect } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { user as userService } from "./../../services";
import { IndexActionsStore } from "./../../reduxStore/actions";
import localStorage from "../../infra/localStorage";

const Profile = (props: any) => {
    
    const {
        actionsUser
    } = IndexActionsStore();
    
    const user = actionsUser?.userState;
    
    const logoutUser = async () => {
        try {
            await userService.logoutUser(user._id);
            await localStorage.removeUser();
            await localStorage.removeStep();
            props.navigation.navigate("SignIn");
        } catch (error) {
            console.log("Error===>>>", error);
        }
    };

    return <View>
        <Text>Profile</Text>
        <TouchableOpacity 
        onPress={() => logoutUser()}>
            <Text>LOGOUT</Text>
        </TouchableOpacity>
    </View>;
};

export default Profile;