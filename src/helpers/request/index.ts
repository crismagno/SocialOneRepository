import axios from "axios";
import { Platform } from "react-native";

const urlAndroidSala = `http://192.168.0.102:3005/`;
const urlAndroidQuarto = `http://192.168.15.181:3005/`;
const urlNotAndroid = `http://localhost:3005/`;

export default {
    requestApi: async (route: string, body: Object = {}, method: string = "GET", othersHeaders: Object = null): Promise<any|never> => {
        
        let headers = {
            "Content-type": "application/json"
        }

        if (othersHeaders) {
            headers = { ...headers, ...othersHeaders };
        }

        const axiosInstance = axios.create({
            baseURL: Platform.OS !== "android" ? urlNotAndroid : urlAndroidQuarto,
            headers,
            timeout: 120000
        });

        switch(method.toUpperCase()) {
            case "GET":
                return await axiosInstance.get(route);
            case "POST":
                return await axiosInstance.post(route, body);
            case "PUT":
                return await axiosInstance.put(route, body);
            case "DELETE":
                return await axiosInstance.delete(route, body);
            default:
                throw  "Method pass error";
        };
    },
};