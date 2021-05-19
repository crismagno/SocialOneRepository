import { IPeopleItem, IUser, IUserCreate } from "../../types";
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

export const getUsers = async (
    searchValue: string, 
    skip: number, 
    limit: number
): Promise<IPeopleItem[]|never> => {
    try {
        const body = {
            searchValue,
            skip,
            limit,
        };

        const response = await request
            .requestApi({
                route: `user`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const getUserById = async (
    userId: string
): Promise<IUser|never> => {
    try {
        const body = {
            userId
        };

        const response = await request
            .requestApi({
                route: `user/by_id`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const logoutUser = async (
    userId: string
): Promise<IUser|never> => {
    try {
        const body = {
            userId
        };

        const response = await request
            .requestApi({
                route: `user/logout`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};
