import axios from "axios";
import { StateRequestSocial } from "./StateRequestSocial";
import { IRequestApi } from "./types";

export const requestApi = async (params: IRequestApi = {
    route: "", 
    body: {}, 
    method: "GET", 
    othersHeaders: {},
    authorization: false
}): Promise<any|never> => {
        
    let headers = {
        "Content-type": "application/json",
    }

    if (params.authorization) {
        headers["Authorization"] = `Bearer ${await StateRequestSocial.getTokenUser()}`;
    }

    if (params.othersHeaders) {
        headers = { ...headers, ...params.othersHeaders };
    }

    const axiosInstance = axios.create({
        baseURL: StateRequestSocial.url,
        headers,
        timeout: 120000
    });

    switch(params.method.toUpperCase()) {
        case "GET":
            return await axiosInstance.get(params.route);
        case "POST":
            return await axiosInstance.post(params.route, params.body);
        case "PUT":
            return await axiosInstance.put(params.route, params.body);
        case "DELETE":
            return await axiosInstance.delete(params.route, params.body);
        default:
            throw  "Method pass error";
    };
};

export default {
    requestApi,   
};
