import AsyncStorage from "@react-native-community/async-storage"
import { IUser, TStepApp } from "../../types";
import variablesLocalStorage from "./variables";

// ================= USER SESSION ========================
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

// ========= STEP APPLICATION=========
export const setStep = async (step: TStepApp): Promise<boolean> => {

    if (!step) return false;

    try {
        await AsyncStorage.setItem(variablesLocalStorage.STEP, step);
        return true;
    } catch (error) {
        return false;
    }
};

export const getStep = async (): Promise<TStepApp|null> => {
    try {
        const stepStorage: TStepApp = await AsyncStorage.getItem(variablesLocalStorage.STEP) as TStepApp;
        if (stepStorage && stepStorage.trim()) {
            return stepStorage;
        }
        return null;
    } catch (error) {
        return null;
    };
};

export const removeStep = async (): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem(variablesLocalStorage.STEP);
        return true;
    } catch (error) {
        return false;
    }
};

export default {
    getUser,
    setUser,
    removeUser,
    getStep,
    setStep,
    removeStep,
};