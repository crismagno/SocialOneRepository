import { IPeopleStore } from "./reducers/people/types";
import { ISocketStore } from "./reducers/socket/types";
import { IUserStore } from "./reducers/user/types";
import { IChatStore } from "./reducers/chat/types";

export interface ICombineReducers {
    user: IUserStore;
    socket: ISocketStore;
    people: IPeopleStore;
    chats: IChatStore;
};