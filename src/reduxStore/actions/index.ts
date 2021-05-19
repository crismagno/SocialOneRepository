import ActionsUser from "./user";
import ActionsSocket from "./socket";
import ActionsPeople from "./people";
import ActionsChat from "./chat";

import { IActionsUser } from "./user/types";
import { IActionsSocket } from "./socket/types";
import { IActionsPeople } from "./people/types";
import { IActionsChat } from "./chat/types";

export interface IIndexActionsStore {
    actionsUser: IActionsUser;
    actionsSocket: IActionsSocket;
    actionsPeople: IActionsPeople;
    actionsChat: IActionsChat;
}

export const IndexActionsStore = (): IIndexActionsStore => {

    const actionsUser: IActionsUser = ActionsUser();
    const actionsSocket: IActionsSocket = ActionsSocket();
    const actionsPeople: IActionsPeople = ActionsPeople();
    const actionsChat: IActionsChat = ActionsChat();

    return {
        actionsUser,
        actionsSocket,
        actionsPeople,
        actionsChat
    }
} 

export default IndexActionsStore;