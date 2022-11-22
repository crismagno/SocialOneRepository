import React, {useEffect, memo, useState} from 'react';
import {View, Text, BackHandler, Keyboard} from 'react-native';
import {IndexActionsStore} from './../../reduxStore';
import styles from './styles';
import ConversationTop from './components/Top';
import ConversationCenter from './components/Center';
import ConversationBottom from './components/Bottom';
import {IPeopleItem, IUserMakingActionOnChat} from '../../types';
import {message as messageService, chat as chatService} from './../../services';
import {IConversation} from '../../reduxStore/conversation/types';
import {IChatSchema} from '../../services/chat/types';
import {IMessageSchema} from '../../services/message/types';
import Loading from '../../elements/Loading';
import ModalRemoveMessages from './components/ModalRemoveMessages';
import {TChooseRemoveMessages, TtypeShowEvent} from './types';
import {IMessageProps} from './components/Center/components/Message/types';
import {handleError} from './../../helpers/global';

const Conversation: React.FC<any> = (props): JSX.Element => {
  // get data about chat by chatId
  useEffect(() => {
    componentDidMounted();

    // acoes do teclado
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // evento do botao de voltar por dispositivo
    // BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      userMakingActionByChat(false, null); // remover acoes do chat de typing or estier gravando audio
      actionsConversation?.setMessagesSelected([]); // zerar array das mensagens selecionadas
      actionsConversation?.setMessages([]); // zerar mensagens do chat atual, nao do store
      actionsConversation?.setChatDataConversation(null); // esvaziar dados do chat atual
      actionsConversation?.setUserChatConversation(null); // esvaziar dados do user chat
      // BackHandler.removeEventListener('hardwareBackPress', backAction);
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  //----------------- PART VARIABLES STORE ---------------------------------
  const {actionsSocket, actionsUser, actionsConversation} = IndexActionsStore();

  const globalSocket = actionsSocket?.socketStateStore?.socket; // configuracoes do socket

  const user = actionsUser?.state; // user do sistema

  const userChat = actionsConversation?.state?.userChat; // dados do usuario atual do chat

  const messages: Array<IMessageProps | IMessageSchema> =
    actionsConversation?.state?.messages; // array das mensagens exibidas

  const chatData: IChatSchema = actionsConversation?.state?.chatData; // dados do chat atual

  //----------------- PART VARIABLES STATE ---------------------------------
  const [text, setText] = useState<string>(''); // text do input

  const [loadInitial, setLoadInitial] = useState<boolean>(false); // load inicial

  const [loadGetMessages, setLoadGetMessages] = useState<boolean>(false); // load de busca das mensagens

  const [
    showModalRemoveMessages,
    setShowModalRemoveMessages,
  ] = useState<boolean>(false); // habilitar modal de deletar mensagens

  const [actionTypingChat, setActionTypingChat] = useState<
    IUserMakingActionOnChat['action']
  >(null); // habilitar modal de deletar mensagens

  // usado para validar se existe de outros usuarios, nas mensagens selecionadas
  const existMessageOthersUsers: boolean =
    messages
      ?.filter(
        (mes: IMessageSchema) =>
          actionsConversation?.state?.messagesSelected?.indexOf(mes?._id) !==
          -1,
      )
      ?.findIndex((mes: IMessageSchema) => mes?.userSent !== user?._id) !== -1;

  //##########################PART VARIABLES##################################
  // data of chat that come of home chats by params
  const chatByParams: IChatSchema = props?.route?.params?.chat || null;

  const limitGetMessages: number = 30;

  //########################PART OF METHODS DE EXECUCAO###########################
  // setar o user do chat
  const configsUserChat = (configsChat: IChatSchema): void => {
    // get user that dont is of my
    const filterUserChatNotMe: IPeopleItem[] = configsChat?.users?.filter(
      (person: IPeopleItem): boolean => person._id !== user._id,
    );

    // validar se no chat tem so os meus usuarios
    const usersChatIsOnlyMe: boolean =
      configsChat?.users?.filter(
        (person: IPeopleItem): boolean => person._id === user._id,
      ).length >= 2;

    // usuario que sera mostrado no chat
    const userShowChat: IPeopleItem = usersChatIsOnlyMe
      ? user
      : filterUserChatNotMe?.length > 0
      ? filterUserChatNotMe[0]
      : null;

    //inserir dados do chat atual e do usuario
    actionsConversation.setChatDataConversation(configsChat);
    actionsConversation.setUserChatConversation(userShowChat);
  };

  // buscar os dados referente ao chat quando montar o componente
  const componentDidMounted = async (): Promise<void> => {
    try {
      setLoadInitial(true);
      // validar se o chatByParams foi passado
      if (!chatByParams?._id) return;

      // setar o chat ja de inicio depois alterar
      configsUserChat(chatByParams);

      // buscar dados do chat
      const response = await chatService.getChatById(
        user._id,
        chatByParams?._id,
      );

      // setar dados do chat no store e no estado do componente
      actionsConversation?.setChatConversation(response.chat);

      // chamar metodo que configura o user do chat com dados do backend mais atualizado
      configsUserChat(response.chat);

      // validar se exist convercasao no store
      const conversationExists: IConversation[] = actionsConversation?.state?.conversations?.filter(
        (conversationState: IConversation) => {
          return conversationState?.chat?._id === chatByParams?._id;
        },
      );

      // dados da conversacao baseado no store application
      const conversation: IConversation =
        conversationExists?.length > 0 ? conversationExists[0] : null;

      // se conversacao existir setar o text com os dados do store, e as mensagens
      if (!!conversation?.text?.trim()) {
        setText(conversation?.text);
      }

      // se a coversacao nao tiver mensagens salvas buscar no backend
      if (!conversation?.messages?.length) {
        const responseMessages = await messageService.getMessagesByChatId(
          user._id,
          chatByParams?._id,
          limitGetMessages,
          0,
        );
        actionsConversation.setMessages(responseMessages?.messages);
      }

      /*
       * se a coversacao tiver mensagens salvas buscar setar do store
       * buscar mensagens baseado na ultima mensagem do chat
       */
      if (conversation?.messages?.length > 0) {
        const lastMessageCreatedAt: Date | string =
          conversation?.messages[0]?.createdAt;
        const responseMessagesByLastMessage = await messageService.getMessagesByChatIdAndDate(
          user._id,
          chatByParams?._id,
          lastMessageCreatedAt,
        );

        // retorna as mensagens mescladas para setar no componente de mensagens
        actionsConversation.setMessages(
          responseMessagesByLastMessage?.messages,
        );
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoadInitial(false);
    }
  };

  // metodo de enviar mensagem de texto
  const sendMessage = async (): Promise<void> => {
    const message_id_temp = `${chatByParams?._id}_id_message_${Date.now()}`;

    try {
      // validar se existe o chatId e a mensagem do textarea esta setada
      if (!chatByParams?._id || !text?.trim()) return;

      // mensagem temporaria para ser substituida por a mensagem do response
      const messageTemp: IMessageProps = {
        message_id_temp,
        chat: chatByParams?._id,
        type: 'text',
        userSent: user?._id,
        value: text.trim(),
        delivery: 'send',
        like: null,
        reply: null,
        seenUsers: [user._id],
        startChat: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // zerando o textarea e do store
      setTextStateAndStore('');

      // setarndo a mensagem temporaria
      actionsConversation.setMessages((messages) => [messageTemp, ...messages]);

      // criando a mensagem
      const response = await messageService.create(
        user._id,
        chatByParams?._id,
        message_id_temp,
        {
          value: text.trim(),
          type: 'text',
        },
      );

      // substituindo a mensagem temporaria
      actionsConversation.setMessages((messages) =>
        messages.map((message: IMessageProps) => {
          if (message?.message_id_temp === response.message_id_temp) {
            return response.messageCreated;
          } else {
            return message;
          }
        }),
      );
    } catch (error) {
      handleError(error);

      // setando erro no envio da mensagem
      actionsConversation.setMessages((messages) =>
        messages.map((message: IMessageProps) => {
          if (message?.message_id_temp === message_id_temp) {
            message.message_send_error = true;
          } else {
            return message;
          }
        }),
      );
    }
  };

  // evento de remover as mensagens
  const onRemoveMessages = async (
    chooseUsersToRemoveMessages: TChooseRemoveMessages,
  ): Promise<void> => {
    try {
      setShowModalRemoveMessages(false);
      // se for remover apenas ao meu usuario ou se vai remover a todos os usuarios do chat
      const removeToUsers: string[] =
        chooseUsersToRemoveMessages === 'ONLY_TO_ME'
          ? Array(user?._id)
          : chatData?.users?.map((user: IPeopleItem) => user?._id);

      const responseMessages = await messageService.removeMessages(
        user._id,
        chatByParams?._id,
        actionsConversation?.state?.messagesSelected,
        removeToUsers,
      );
      updatedMessagesComponent(responseMessages?.messages);
    } catch (error) {
      handleError(error);
    } finally {
      actionsConversation?.setMessagesSelected([]);
    }
  };

  // evento de voltar a pagina pelo botao do dispositivo
  const backAction = () => {
    // if (actionsConversation?.state?.messagesSelected.length > 0) {
    //   actionsConversation?.setMessagesSelected([]);
    //   return true;
    // }
  };

  // metofdos de execucao do teclado
  const _keyboardDidShow = () => {
    if (text?.trim()) {
      userMakingActionByChat(true, 'text');
    }
  };

  const _keyboardDidHide = () => {
    userMakingActionByChat(false, null);
  };

  //############################METODOS PARA PASSAR AOS OUTROS COMPONENTES#####################################
  // setar o id das mensagens para alguma acao
  const setMessageId = (_id: string, type: 'insert' | 'return') => {
    if (type === 'insert')
      actionsConversation?.setMessagesSelected((ids) => [...ids, _id]);
    if (type === 'return')
      actionsConversation?.setMessagesSelected((ids) =>
        ids.filter((value: string) => value !== _id),
      );
  };

  // voltar a pagina anterior
  const goBackRoute = (): void => props?.navigation?.navigate('Home');

  // buscar as mensagens pelo scroll da lista
  const getMoreMessages = async (): Promise<void> => {
    try {
      if (!chatByParams?._id || loadGetMessages) {
        console.log(
          'parametro chat nao existe.... ou load de get messages processando...',
        );
        return;
      }
      setLoadGetMessages(true);

      // validar se existe a primeira mensagem para nao buscar as mensagens de forma desnecessaria
      const existMessageStartChat: number = messages?.findIndex(
        (message: IMessageProps | IMessageSchema) => message?.startChat,
      );

      // se tiver a ultima mensagem nao buscar mais mensagens
      if (existMessageStartChat === -1) {
        const skipGetMessages = messages?.length;
        const responseMessages = await messageService.getMessagesByChatId(
          user._id,
          chatByParams?._id,
          limitGetMessages,
          skipGetMessages,
        );

        actionsConversation.setMessages((messages) => [
          ...messages,
          ...responseMessages?.messages,
        ]);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoadGetMessages(false);
    }
  };

  // metodo que abre os modais de acordo com o tipo chamado
  const showModal = (typeModal: TtypeShowEvent): void => {
    switch (typeModal) {
      case 'REMOVE_MESSAGES':
        setShowModalRemoveMessages(true);
        break;
      default:
        break;
    }
  };

  // acoes do chat como enviar texto e audio etc...
  const userMakingActionByChat = (
    isMakingAction: boolean = false,
    action: IUserMakingActionOnChat['action'],
  ) => {
    const dataOfActionChatToSocket: IUserMakingActionOnChat = {
      userId: user?._id,
      chatId: chatByParams?._id,
      isMakingAction,
      socketId: globalSocket?.id,
      action,
    };
    setActionTypingChat(action);
    // identificar acao do chat se esta digitando texto, ou gravando audio/video
    globalSocket?.emit(
      `user-is-making-action-on-chat`,
      dataOfActionChatToSocket,
    );
  };

  //######################METODOS DE TRANSFORMACAO DE DADOS###########################
  // atualizia as mensgagens do componente
  const updatedMessagesComponent = (messagesParams: IMessageSchema[]) => {
    // remover status da mensagem removida
    actionsConversation.setMessages((messages) => {
      return messages.map((message: IMessageProps) => {
        const indexMessageFounded: number = messagesParams?.findIndex(
          (messageResponse: IMessageSchema) =>
            messageResponse?._id == message?._id,
        );
        // subistituir mensagem removida para o usuario
        if (indexMessageFounded > -1) {
          message = messagesParams[indexMessageFounded];
        }
        return message;
      });
    });
  };

  // setar textinput no estado e no store
  const setTextStateAndStore = (value: string): void => {
    setText(value);

    // inserir os dados do textarea
    actionsConversation?.setTextConversation(chatByParams?._id, value);

    // validar se e o msm usuario do chat e nao enviar socket de acao
    if (userChat?._id === user?._id) return;

    // validar se sera enviado o socket de acao do chat novamente
    if (value.trim() && actionTypingChat !== 'text') {
      userMakingActionByChat(true, 'text');
    }

    // validar se sera enviado o socket de acao do chat novamente
    if (!value.trim() && actionTypingChat) {
      userMakingActionByChat(false, null);
    }
  };

  if (!chatByParams?._id) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Loading show={loadInitial} />
      <ConversationTop
        fullName={userChat?.fullName}
        avatar={userChat?.avatar}
        online={userChat?.online}
        actionChat={userChat?.actionChat}
        goBack={goBackRoute}
        messagesSelected={actionsConversation?.state?.messagesSelected}
        showModal={showModal}
        cancelMessagesSelected={() =>
          actionsConversation?.setMessagesSelected([])
        }
      />
      <ConversationCenter
        data={messages}
        getMoreMessages={getMoreMessages}
        loadGetMessages={loadGetMessages}
        loadInitial={loadInitial}
        setMessageId={setMessageId}
        messagesSelected={actionsConversation?.state?.messagesSelected}
        chatData={chatData}
      />
      <ConversationBottom
        message={text}
        setMessage={setTextStateAndStore}
        sendMessage={sendMessage}
      />

      {/* ############# MODAIS DE ACOES ############### */}
      <ModalRemoveMessages
        show={showModalRemoveMessages}
        onClose={() => setShowModalRemoveMessages(false)}
        onRemoveMessages={onRemoveMessages}
        existMessageOthersUsers={existMessageOthersUsers}
      />
    </View>
  );
};

export default memo(Conversation);
