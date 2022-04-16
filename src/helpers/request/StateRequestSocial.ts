import { Platform } from "react-native";
import localStorage from "./../../infra/localStorage";
import { URL_ANDROID, URL_NOT_ANDROID } from "./../../../env";

export class StateRequestSocial {
    public static url: string = Platform.OS !== "android" ? URL_NOT_ANDROID : URL_ANDROID;
    public static tokenUser: string = "";

    public static setTokenState = (token: string) => {
        StateRequestSocial.tokenUser = token;
    };

    public static getTokenUser = async (): Promise<string> => {
        if (!!StateRequestSocial.tokenUser.trim()) {
            return StateRequestSocial.tokenUser;
        }
        return (await localStorage.getUser()).token;
    };
};