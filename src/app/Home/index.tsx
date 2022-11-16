import React, {useEffect, memo} from 'react';
import {View, StatusBar} from 'react-native';
import styles from './styles';
import ListChat from './components/ListChat';
import {IndexActionsStore} from './../../reduxStore';
import {
  IChatItem,
  ISetIdUserOnSeenMessages,
  IUser,
  IUserMakingActionOnChat,
  TStepApp,
} from '../../types';
import localStorage from './../../infra/localStorage';
import {user as userService} from './../../services';
import {StateRequestSocial} from '../../helpers/request/StateRequestSocial';
import {IMessageSchema} from '../../services/message/types';
import {SnackBarSocialDefault} from '../../elements/SnackBarSocial';
import {errorHandling} from '../../helpers/global';
import {colorsSocial} from '../../assets/general';

const Home: React.FC = (props): JSX.Element => {
  const {
    actionsSocket,
    actionsUser,
    actionsChat,
    actionsPeople,
    actionsConversation,
  } = IndexActionsStore();

  const globalSocket = actionsSocket?.socketStateStore?.socket;
  const user = actionsUser?.state;
  // const userChat = actionsConversation?.state?.userChat;

  // sockets more importants general
  useEffect(() => {
    // socket that inform new chat to creator and person
    globalSocket?.on(
      `create-chat-send-to-creator-${user._id}`,
      (data: IChatItem): void => {
        actionsChat.addChats([data]);
      },
    );
    globalSocket?.on(
      `create-chat-send-to-person-${user._id}`,
      (data: IChatItem): void => {
        if (data?.creator === user._id) return;
        actionsChat.addChats([data]);
      },
    );

    // inform that user being online
    globalSocket?.compress(true)?.emit(`inform-user-online`, {
      userId: user._id,
      socketId: globalSocket?.id,
    });

    // inform users online
    globalSocket?.on(`inform-user-is-online`, (userId: string): void => {
      if (!userId.trim()) return;
      actionsChat.updateStatusOnlineOfPerson(userId, true);
      actionsPeople.updateStatusOnlineOfPerson(userId, true);
      actionsConversation?.updatePropertyUserChatConversation(
        'online',
        true,
        userId,
      );

      // if my user then update status to online
      if (userId === user._id) {
        actionsUser.updateStatusOnline(true);
      }
    });

    // inform users offline
    globalSocket?.on(`inform-user-is-offline`, (userId: string): void => {
      if (!userId.trim()) return;
      actionsChat.updateStatusOnlineOfPerson(userId, false);
      actionsPeople.updateStatusOnlineOfPerson(userId, false);
      actionsConversation?.updatePropertyUserChatConversation(
        'online',
        false,
        userId,
      );

      // if my user then update status to offline
      if (userId === user._id) {
        actionsUser.updateStatusOnline(false);
      }
    });

    // socket that inform what update user profile info
    globalSocket?.on(
      `inform-user-update-profile-info`,
      async (data: {
        userId: string;
        property: keyof IUser;
        newValue: string;
      }) => {
        // if my user then update
        if (data.userId === user._id) {
          actionsUser.updateProfileInfo(data.property, data.newValue);
          await localStorage.updatePropertyUser(data.property, data.newValue);
        }
      },
    );

    // nova mensagem recebida atualizar no chat-home
    globalSocket?.on(
      `message-created-by-chat-id-home`,
      async (data: {
        userId: string;
        chatId: string;
        messageCreated: IMessageSchema;
        message_id_temp: string;
      }) => {
        // inserir mensagem no chat atual
        actionsConversation?.insertNewMessageOnMessages(
          user,
          globalSocket,
          data.userId,
          data.chatId,
          data.messageCreated,
        );
        // atualizar ultima mensagem dos chats
        actionsChat.updateLastMessageChat(data.chatId, data.messageCreated);
      },
    );

    // mensagem atualizada recebida atualizar no chat-home
    globalSocket?.on(
      `messages-updated-by-chat-id-home`,
      async (data: {
        userId: string;
        chatId: string;
        messages: IMessageSchema[];
      }) => {
        // atualizar as mensagens do chat atual
        actionsConversation?.updateMessagesChatAtual(
          user,
          data?.userId,
          data?.chatId,
          data?.messages,
        );
        // atualizar ultima mensagem da lista de chat
        actionsChat.updateMessageChat(data.chatId, data.messages);
      },
    );

    // identificar acao do chat se esta digitando texto, ou gravando audio/video
    globalSocket?.on(
      `user-is-making-action-on-chat-by-home`,
      async (data: IUserMakingActionOnChat) => {
        // atualizando no chat que esta na conversa atual
        actionsConversation?.updatePropertyUserChatConversation(
          'actionChat',
          {action: data?.action, userId: data?.userId},
          data?.userId,
        );
        //  enviar tambem para os dados do "actionsChat"
        actionsChat?.updatePropertyChat(
          data?.chatId,
          data?.userId,
          'actionChat',
          {action: data?.action, userId: data?.userId},
        );
      },
    );

    // recebimento das mensagens que foram atualizadas o seen pelo user que entrou no chat
    globalSocket?.on(
      `set-seen-messages-by-home-${user?._id}`,
      async (data: ISetIdUserOnSeenMessages) => {
        // atualizar visto das mensagens baseado no userId e chatId
        actionsConversation?.putUserOnSeenMessagesByChatAtual(data);
        // atualizar visto da ultima mensagem do chat
        actionsChat?.putUserOnSeenLastMessageByChat(data);
      },
    );

    // configs socket............................
    globalSocket?.on('connect', () => {
      // inform that user being online
      if (user?._id) {
        globalSocket?.compress(true)?.emit(`inform-user-online`, {
          userId: user._id,
          socketId: globalSocket?.id,
        });
      }
    });

    globalSocket?.on('disconnect', () => {
      //put offline peoples and chats
      actionsChat?.updateStatusOnlineOfAllPerson(false);
      actionsPeople?.updateStatusOnlineOfAllPerson(false);
      actionsUser?.updateStatusOnline(false);
      actionsConversation?.updatePropertyUserChatConversation('online', false);
    });

    // quando usuário entrar na tela home buscar os dados do usuário
    getUserBackend();

    // close all sockets that were opened
    return () => {
      globalSocket?.off(`create-chat-send-to-creator-${user._id}`);
      globalSocket?.off(`create-chat-send-to-person-${user._id}`);
      globalSocket?.off(`inform-user-is-online`);
      globalSocket?.off(`inform-user-is-offline`);
      globalSocket?.off(`inform-user-update-profile-info`);
      globalSocket?.off(`message-created-by-chat-id-home`);
      globalSocket?.off(`messages-updated-by-chat-id-home`);
      globalSocket?.off(`user-is-making-action-on-chat-by-home`);
      globalSocket?.off(`set-seen-messages-by-home-${user?._id}`);
    };
  }, []);

  // quando usuário entrar na tela home buscar os dados do usuário
  const getUserBackend = async () => {
    try {
      // validate where step came show app, if verifyCode don't get user again
      const stepLocalStorage: TStepApp = await localStorage.getStep();
      if (stepLocalStorage === 'VerifyCode') {
        await localStorage.setStep('App');
        return;
      }

      const userBackend = await userService.getUserById(user._id);
      actionsUser.setUser(userBackend);
      actionsUser.updateStatusOnline(true);
      await localStorage.setUser(userBackend);
      StateRequestSocial.setTokenState(userBackend.token); // insert in class de StateRequest
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA13,
        colorButton: colorsSocial.colorA13,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} backgroundColor={colorsSocial.colorA4} />
      <ListChat {...props} />
    </View>
  );
};

export default memo(Home);
