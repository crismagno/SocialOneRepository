import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard,
  Text,
} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import If from '../../../../elements/If';
import {TextInput} from 'react-native-paper';

export interface IModalAlterInfoProps {
  show: boolean;
  value: string;
  title: string;
  placeholder: string;
  onCloseModal: () => void;
  onExecuteSave: (value: string) => void;
}

const ModalAlterInfo: React.FC<IModalAlterInfoProps> = (props): JSX.Element => {
  useEffect(() => {
    animamtionShow();
  }, [props.show]);

  const animamtionShow = async () => {
    if (props.show) {
      await setShowModal(true);
      textInputRef?.current?.focus();
      boxModalRef.current?.fadeInUp(300, 500);
    } else {
      await boxModalRef.current?.fadeOutDown(100);
      setShowModal(false);
      setValue(props.value);
      props.onCloseModal();
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const textInputRef = useRef(null);
  const boxModalRef = useRef(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [showModal, setShowModal] = useState(props.show);
  const [value, setValue] = useState(props.value);

  // métodos de visualizar estado do teclado
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  return (
    <If condition={showModal}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          contentContainerStyle={styles.containerKeyboard}
          behavior={Platform.select({
            ios: 'padding',
            android: 'position',
          })}
          enabled>
          <TouchableOpacity
            onPress={() => props.onCloseModal()}
            activeOpacity={0.95}
            style={styles.containerButton(keyboardStatus)}
          />
          <Animatable.View
            ref={boxModalRef}
            style={styles.boxModal(keyboardStatus)}>
            <Text style={styles.textTitle}>{props.title}</Text>
            <TextInput
              ref={textInputRef}
              // mode={"outlined"}
              placeholder={props.placeholder}
              style={styles.input}
              value={value}
              onChangeText={(text) => setValue(text)}
            />
            <View style={styles.containerBottom}>
            <TouchableOpacity
                onPress={() => props.onCloseModal()}
                activeOpacity={0.8}
                style={styles.buttonBottom}>
                    <Text style={styles.textButton}>{"CANCEL"}</Text>
                </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.onExecuteSave(value)}
                activeOpacity={0.8}
                style={styles.buttonBottom}>
                    <Text style={styles.textButton}>{"SAVE"}</Text>
                </TouchableOpacity>
            </View>
          </Animatable.View>
        </KeyboardAvoidingView>
      </View>
    </If>
  );
};

export default ModalAlterInfo;
