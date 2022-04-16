import React, {useEffect, memo, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setSize} from '../../../../helpers/responsive/Index';
import {colorsSocial} from '../../../../assets/general';
import { TouchableOpacity } from 'react-native-gesture-handler';
import If from '../../../../elements/If';

export interface IConversationBottomProps {
  message: string;
  setMessage: (text: string) => void;
  sendMessage: () => void;
}

const ConversationBottom: React.FC<IConversationBottomProps> = (
  props,
): JSX.Element => {
  // verifica se o teclado esta aberto ou fechado
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  // métodos de visualizar estado do teclado
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);
  const inputRef = useRef(null);

  return (
    <KeyboardAvoidingView
      enabled
      keyboardVerticalOffset={setSize(keyboardStatus ? 0 : 30)}
      contentContainerStyle={styles.containerBottomKeyboard(keyboardStatus)}
      behavior={Platform.select({
        ios: 'padding',
        android: 'padding',
      })}
    >
        <View style={styles.containerSend(keyboardStatus)}>
          <TextInput
            ref={inputRef}
            style={styles.inputSendMessage(
              inputRef?.current?.isFocused(), 
              !!props?.message.trim()
            )}
            placeholder={'Send something message?'}
            multiline={true}
            onChangeText={text => props.setMessage(text)}
            value={props.message}
            placeholderTextColor="#cfcccc"
          />
          <If condition={inputRef?.current?.isFocused() || !!props?.message.trim()}>
            <TouchableOpacity 
              activeOpacity={0.5}
              style={styles.buttonSend}
              onPress={() => props?.sendMessage()}>
              <Ionicons
                name={'send-outline'}
                size={setSize(13)}
                color={colorsSocial.colorA1}
              />
            </TouchableOpacity>
          </If> 
          {/* <If condition={!inputRef?.current?.isFocused() && !props?.message.trim()}>
            <TouchableOpacity 
              activeOpacity={0.5}
              style={styles.buttonSend}
              onPress={() => {}}>
              <MaterialCommunityIcons
                name={'microphone-outline'}
                size={setSize(15)}
                color={colorsSocial.colorA1}
              />
            </TouchableOpacity>
          </If>  */}
        </View>
    </KeyboardAvoidingView>
  );
};

export default memo(ConversationBottom);
