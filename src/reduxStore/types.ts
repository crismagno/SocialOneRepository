import { ISocketInitialState } from "./socket/types";
import { IUserInitialState } from "./user/types";
import { IProfileInitialState } from "./profile/types";
import { IPeopleInitialState } from "./people/types";
import { IChatInitialState } from "./chat/types";
import { IConversationInitialState } from "./conversation/types";

export interface ICombineReducers {
    user: IUserInitialState;
    socket: ISocketInitialState;
    people: IPeopleInitialState;
    chats: IChatInitialState;
    profile: IProfileInitialState;
    conversation: IConversationInitialState;
};