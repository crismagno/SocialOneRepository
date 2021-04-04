import AsyncStorage from "@react-native-community/async-storage"
import { IUser } from "../../types";
import variablesLocalStorage from "./variables";

export const setUser = async (user: IUser): Promise<boolean> => {

    if (!user) return false;

    try {
        const userFormatted: string = JSON.stringify(user);
        await AsyncStorage.setItem(variablesLocalStorage.USER, userFormatted);
        return true;
    } catch (error) {
        return false;
    }
};

export const getUser = async (): Promise<IUser|null> => {
    try {
        const userStorage: string = await AsyncStorage.getItem(variablesLocalStorage.USER);
        if (userStorage && userStorage.trim()) {
            const userStorageFormatted: IUser = JSON.parse(userStorage);
            return userStorageFormatted;
        }
        return null;
    } catch (error) {
        return null;
    };
};

export const removeUser = async (): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem(variablesLocalStorage.USER);
        return true;
    } catch (error) {
        return false;
    }
};

export default {
    getUser,
    setUser,
    removeUser
};