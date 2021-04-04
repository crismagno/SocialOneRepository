import { IUser, IUserCreate } from "../../types";
import request from "./../../helpers/request";
import { IUserSignIn } from "./types";

export const signIn = async (user: IUserSignIn): Promise<IUser|never> => {
    try {
        const response = await request
            .requestApi({
                route: `user/signin`,
                body: user,
                method: "POST"
            });
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const signUp = async (user: IUserCreate): Promise<IUser|never> => {
    try {
        const response = await request
            .requestApi({
                route: `user/signup`,
                body: user,
                method: "POST"
            });    
        return response.data;
    } catch (error) {
        throw error;
    };
};
