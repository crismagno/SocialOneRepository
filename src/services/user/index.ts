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
    userId: string,
    socketId: string,
): Promise<IUser|never> => {
    try {
        const body = {
            userId,
            socketId
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

export const changeAvatar = async (
    body: any
): Promise<{ 
    message: string; 
    avatar: string; 
}|never> => {
    try {
        const response = await request
            .requestApi({
                route: `user/avatar`,
                body,
                method: "PUT",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const updateProfileInfo = async (
    userId: string,
    property: string,
    newValue: string,
): Promise<{
    message: string;
    newValue: string;
}|never> => {
    try {

        const body = {
            userId,
            property,
            newValue
        };

        const response = await request
            .requestApi({
                route: `user/profile`,
                body,
                method: "PUT",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const changeEmail = async (
    userId: string,
    newEmail: string,
): Promise<{
    message: string;
    value?: string | null;
}|never> => {
    try {

        const body = {
            userId,
            newEmail
        };

        const response = await request
            .requestApi({
                route: `user/change_email`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const validateExistsEmailChange = async (
    userId: string,
): Promise<{
    message: string;
    value?: string | null;
}|never> => {
    try {

        const body = {
            userId,
        };

        const response = await request
            .requestApi({
                route: `user/validate_exists_email_change`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const cancelEmailPendingOfChange = async (
    userId: string,
): Promise<{
    message: string;
}|never> => {
    try {

        const body = {
            userId,
        };

        const response = await request
            .requestApi({
                route: `user/cancel_email_pending_change`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const validatePassword = async (
    userId: string,
    password: string
): Promise<{
    message: string;
    value: boolean
}|never> => {
    try {

        const body = {
            userId,
            password
        };

        const response = await request
            .requestApi({
                route: `user/validate_password`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};

export const updatePassword = async (
    userId: string,
    newPassword: string
): Promise<{
    message: string;
    value: boolean
}|never> => {
    try {

        const body = {
            userId,
            newPassword
        };

        const response = await request
            .requestApi({
                route: `user/update_password`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};
