// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-community/async-storage"

const variablesStorage = {
    USER: "USER"
};

export default {
    setUser: async user => {

        if (!user) {
            return null;
        }

        try {
            const userFormatted = JSON.stringify(user);
            const userStorage = await AsyncStorage.setItem(variablesStorage.USER, userFormatted);
            return userStorage;
        } catch (error) {
            return null;
        }
    },

    getUser: async () => {
        try {
            const userStorage = await AsyncStorage.getItem(variablesStorage.USER)
            if (userStorage && userStorage.trim()) {
                const userStorageFormatted = JSON.parse(userStorage);
                return userStorageFormatted;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },

    removeUser: async () => {
        try {
            await AsyncStorage.removeItem(variablesStorage.USER)
            return true
        } catch (error) {
            return false;
        }
    }
};