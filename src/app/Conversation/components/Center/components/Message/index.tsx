import React, {memo} from 'react';
import styles from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {IMessageProps} from './types';
import {IndexActionsStore} from '../../../../../../reduxStore';
import 'moment/dist/locale/en-in';
import MessageBubble from './components/MessageBubble';
import { TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

const Message: React.FC<IMessageProps> = (props): JSX.Element => {
  const {actionsUser} = IndexActionsStore();
  const user = actionsUser?.state;

  // verificar mensagem esta nas selecionadas
  const messageIsSelected = props.messagesSelected?.indexOf(props?._id) > -1;
  // verificar se mensagem esta desabilitada para o usuario
  const messageIsDisabledToMe = props.removeToUsers?.indexOf(user?._id) > -1; 
  
  // evento de selecionar a mensagem para algum outra acao
  const onEventToDeleteMessage = () => {
    
    // nao pode remover a primeira mensagem
    if (props?.startChat) return;

    // so executar a acao se a mensagem nao for deletada
    if (messageIsDisabledToMe) return;
    
    if(messageIsSelected) {
      props?.setMessageId(props?._id, "return");
    } else {
      props?.setMessageId(props?._id, "insert");
    };
  };

  return (
    <Swipeable>
      {/*  container principal da mensagem */}
      <TouchableOpacity 
        onPress={() => props?.messagesSelected?.length > 0 && onEventToDeleteMessage()}
        onLongPress={() => onEventToDeleteMessage()}
        activeOpacity={0.8}
        style={styles.container(
          props?.userSent == user._id,
          messageIsSelected
        )}>
        <MessageBubble 
          {...props} 
          user={user} 
          onEventMessage={onEventToDeleteMessage} 
        />
      </TouchableOpacity>
    </Swipeable>
  );
};

export default memo(Message);
