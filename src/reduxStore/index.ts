import ActionsUser from './user/actions';
import ActionsSocket from './socket/actions';
import ActionsPeople from './people/actions';
import ActionsChat from './chat/actions';
import ActionsProfile from './profile/actions';
import ActionsConversation from './conversation/actions';

import {IActionsUserStore} from './user/types';
import {ISocketActions} from './socket/types';
import {IChatActionsStore} from './chat/types';
import {IPeopleActionsStore} from './people/types';
import {IProfileActionsStore} from './profile/types';
import {IConversationActionsStore} from './conversation/types';

export interface IIndexActionsStore {
  actionsUser: IActionsUserStore;
  actionsSocket: ISocketActions;
  actionsChat: IChatActionsStore;
  actionsProfile: IProfileActionsStore;
  actionsPeople: IPeopleActionsStore;
  actionsConversation: IConversationActionsStore;
}

export const IndexActionsStore = (): IIndexActionsStore => {
  const actionsUser: IActionsUserStore = ActionsUser();
  const actionsSocket: ISocketActions = ActionsSocket();
  const actionsPeople: IPeopleActionsStore = ActionsPeople();
  const actionsChat: IChatActionsStore = ActionsChat();
  const actionsProfile: IProfileActionsStore = ActionsProfile();
  const actionsConversation: IConversationActionsStore = ActionsConversation();

  return {
    actionsUser,
    actionsSocket,
    actionsPeople,
    actionsChat,
    actionsProfile,
    actionsConversation,
  };
};

export default IndexActionsStore;
