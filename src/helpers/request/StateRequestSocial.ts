import { Platform } from "react-native";
import localStorage from "./../../infra/localStorage";

const urlAndroidNgrok = `https://ad6916973890.ngrok.io/`;
const urlAndroidSala = `http://192.168.0.102:3005/`;
const urlAndroidQuarto = `http://192.168.15.181:3005/`;
const urlNotAndroid = `http://localhost:3005/`;
const urlCasaInterior = `http://192.168.1.108:3005/`;

export class StateRequestSocial {
    public static url: string = Platform.OS !== "android" ? urlNotAndroid : urlAndroidQuarto;
    public static tokenUser: string = "";

    public changeUrl = (): void => {
        StateRequestSocial.url = StateRequestSocial.url === urlAndroidSala ? 
            urlAndroidQuarto : urlAndroidSala;
    };

    public static setTokenState = (token: string) => {
        StateRequestSocial.tokenUser = token;
    };

    public static getTokenUser = async (): Promise<string> => {
        if (!StateRequestSocial.tokenUser.trim()) {
            return StateRequestSocial.tokenUser;
        }
        return (await localStorage.getUser()).token;
    };
};