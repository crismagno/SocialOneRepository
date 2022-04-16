import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';
import If from '../../../../elements/If';
import {Modalize} from 'react-native-modalize';
import {setSize} from '../../../../helpers/responsive/Index';
import {TextInput} from 'react-native-paper';
import { colorsSocial } from '../../../../assets/general';
import ButtonGradient from "./../../../../elements/ButtonGradient";
import {IndexActionsStore} from '../../../../reduxStore';
import {
  user as userService,
} from './../../../../services';
import { errorHandling } from '../../../../helpers/global';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import SnackBarSocialDefault from '../../../../elements/SnackBarSocial';

export interface IModalAlterPasswordProps {
  show: boolean;
  onClose: () => void;
}

const ModalAlterPassword: React.FC<IModalAlterPasswordProps> = (
  props,
): JSX.Element => {

  // event to show modal
  useEffect(() => {
    if (props.show) {
      modalizeRef?.current?.open();
    } else {
      modalizeRef?.current?.close();
      cleanStateVariables();
    }
  }, [props.show]);
  
  // actions state store
  const {actionsUser} = IndexActionsStore();
  const user = actionsUser?.state;
  
  const modalizeRef = useRef<Modalize>(null);
  const inputNewPasswordRef = useRef<TextInputProps>(null);
  const inputLastPasswordRef = useRef<TextInputProps>(null);
  const [lastPassword, setLastPassword] = useState<string>("");
  const [lastPasswordIsValid, setLastPasswordIsValid] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);

  const validateLastPassword = async (): Promise<void> => {
    try {
      setLoad(true);
      const response = await userService.validatePassword(user?._id, lastPassword);
      setLastPasswordIsValid(response.value);
      inputNewPasswordRef?.current?.focus();
      SnackBarSocialDefault({
        text: response.message,
        colorButton: colorsSocial.colorA4
      });
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        colorButton: colorsSocial.colorA3,
        textColor: colorsSocial.colorA3
      });
    } finally {
      setLoad(false);
    }
  };
  
  const updatePassword = async (): Promise<void> => {
    try {
      setLoad(true);
      const response = await userService.updatePassword(user?._id, newPassword);
      SnackBarSocialDefault({
        text: response.message,
        colorButton: colorsSocial.colorA4
      });
      props.onClose();
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        colorButton: colorsSocial.colorA3,
        textColor: colorsSocial.colorA3
      });
    } finally {
      setLoad(false);
    }
  };

  const cleanStateVariables = () => {
    setLastPassword("");
    setLastPasswordIsValid(false);
    setNewPassword("");
    setLoad(false);
  }

  return (
    <Modalize
      ref={modalizeRef}
      onClosed={props.onClose}
      snapPoint={setSize(450)}
      keyboardAvoidingBehavior={'padding'}
      modalHeight={450}
      HeaderComponent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {'Alter Password'}
          </Text>
        </View>
      }>
        <View
          style={styles.container}>

          <TextInput
            ref={inputLastPasswordRef}
            style={styles.input}
            onSubmitEditing={() => validateLastPassword()}
            mode="outlined"
            label="Last Password"
            placeholder={"Type your last password"}
            value={lastPassword}
            secureTextEntry={true}
            onChangeText={(text) => setLastPassword(text)}
            left={
              <TextInput.Icon 
                style={{ marginTop: setSize(15)}}
                name="key" 
                size={setSize(17)}
                color={colorsSocial.colorA4}
              />
            }
          />

          <If condition={lastPasswordIsValid}>
            <TextInput
              ref={inputNewPasswordRef}
              style={styles.input}
              onSubmitEditing={() => updatePassword()}
              mode="outlined"
              label="New Password"
              placeholder={"Type your new password"}
              value={newPassword}
              secureTextEntry={true}
              onChangeText={(text) => setNewPassword(text)}
              left={
                <TextInput.Icon 
                  style={{ marginTop: setSize(15)}}
                  name="key" 
                  size={setSize(17)}
                  color={colorsSocial.colorA4}
                />
              }
            />
          </If>

          <ButtonGradient
            style={styles.button}
            load={load}
            colors={[colorsSocial.colorA4, colorsSocial.colorA6]}
            onPress={() => lastPasswordIsValid ? updatePassword : validateLastPassword()}
            animationInitial={"fadeIn"}
            animationClick={"pulse"}
            label={lastPasswordIsValid ? "UPDATE" : "VERIFY"}
          />
        
        </View>
      </Modalize>
  );
};

export default memo(ModalAlterPassword);
