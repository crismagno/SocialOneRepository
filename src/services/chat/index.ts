import { IChatItem, IPeopleItem } from "../../types";
import request from "./../../helpers/request";
import { IResponseDataGetChatByUser } from "./types";

export const create = async (
    creator: string, 
    person: string
): Promise<any|never> => {
    try {
        const body = {
            creator,
            person,
        };

        const response = await request
            .requestApi({
                route: `chat`,
                body,
                method: "POST",
                authorization: true
            });    

        return response.data;
    } catch (error) {
        throw error;
    };
};

export const getChatsByUser = async (
    userId: string,
    searchValue: string, 
    skip: number, 
    limit: number
): Promise<IResponseDataGetChatByUser|never> => {
    try {
        const body = {
            userId,
            searchValue,
            skip,
            limit,
        };

        const response = await request
            .requestApi({
                route: `chat/by_user`,
                body,
                method: "POST",
                authorization: true
            });    
            
        return response.data;
    } catch (error) {
        throw error;
    };
};
