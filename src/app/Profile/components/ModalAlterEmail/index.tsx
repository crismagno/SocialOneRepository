import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';
import If from '../../../../elements/If';
import {Modalize} from 'react-native-modalize';
import {setSize} from '../../../../helpers/responsive/Index';
import {Button, TextInput} from 'react-native-paper';
import { colorsSocial } from '../../../../assets/general';
import ButtonGradient from "./../../../../elements/ButtonGradient";
import {IndexActionsStore} from '../../../../reduxStore';
import {
  user as userService, 
  code as codeService
} from './../../../../services';
import { errorHandling, validateEmail } from '../../../../helpers/global';
import localStorage from '../../../../infra/localStorage';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import SnackBarSocialDefault from '../../../../elements/SnackBarSocial';

export interface IModalAlterEmailProps {
  show: boolean;
  onClose: () => void;
}

const ModalAlterEmail: React.FC<IModalAlterEmailProps> = (
  props,
): JSX.Element => {

  // event to show modal
  useEffect(() => {
    if (props.show) {
      modalizeRef?.current?.open();
      validateExistsEmailChange();
    } else {
      modalizeRef?.current?.close();
    }
  }, [props.show]);
  
  // actions state store
  const {actionsUser} = IndexActionsStore();
  const user = actionsUser?.state;
  
  const modalizeRef = useRef<Modalize>(null);
  const inputNewEmailRef = useRef<TextInputProps>(null);
  const inputCodeRef = useRef<TextInputProps>(null);
  const [existsEmailToChange, setExistsEmailToChange] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>(user.email);
  const [code, setCode] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [loadCancelEmailPending, setLoadCancelEmailPending] = useState<boolean>(false);

  const validateExistsEmailChange = async (): Promise<void> => {
    try {
      const validateExistsEmailChange = await userService.validateExistsEmailChange(user._id);
      // validate if exists email pending for change
      if (validateExistsEmailChange.value) {
        setExistsEmailToChange(validateExistsEmailChange.value);
        setNewEmail(validateExistsEmailChange.value);
        inputCodeRef?.current?.focus();
      } else {
        setExistsEmailToChange("");
        setNewEmail(user?.email);
        inputNewEmailRef?.current?.focus();
      }
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        colorButton: colorsSocial.colorA3,
        textColor: colorsSocial.colorA3
      });
    }
  }

  const changeEmail = async (): Promise<void> => {
    try {
      if (validateInputNewEmail()) return;
      const response = await userService.changeEmail(user._id, newEmail);
      setExistsEmailToChange(response.value);
      inputCodeRef?.current?.focus();
      SnackBarSocialDefault({
        text: "New E-mail verify, insert code to confirm change.",
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
  }

  const validateCodeEmail = async (): Promise<void> => {
    try {
      setLoad(true);
      const response = await codeService.validateCodeChangeEmail({
        userId: user._id,
        code,
        typeCode: "CHANGE_EMAIL"
    });
      actionsUser.updateProfileInfo("email", existsEmailToChange);
      await localStorage.updatePropertyUser("email", existsEmailToChange);
      setExistsEmailToChange("");
      setNewEmail("");
      setCode("");
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
  }

  const resendCodeChangeEmail = async (): Promise<void> => {
    try {
        const response = await codeService.resendCode({
            userId: user._id,
            typeCode: "CHANGE_EMAIL"
        });
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
    }
  };

  const validateInputNewEmail = () => {
    if (!newEmail.trim() || !validateEmail(newEmail?.trim())) {
      SnackBarSocialDefault({
        text: "Format E-mail invalid",
        colorButton: colorsSocial.colorA3,
        textColor: colorsSocial.colorA3
      });
      return true;
    } else {
      return false;
    }
  }

  const cancelEmailPendingOfChange =  async (): Promise<void> => {
    try {
      setLoadCancelEmailPending(true);
      const response = await userService.cancelEmailPendingOfChange(user._id);
      inputNewEmailRef?.current?.focus();
      setExistsEmailToChange("");
      setNewEmail(user?.email);
      setCode("");
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
      setLoadCancelEmailPending(false);
    }
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
            {'Alter E-mail'}
          </Text>
        </View>
      }>
        <View
          style={styles.container}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Current E-mail"
            value={user.email}
            disabled
            left={
              <TextInput.Icon 
                style={{ marginTop: setSize(15)}}
                name="at" 
                size={setSize(17)}
                color={"#0005"}
              />
            }
          />

          <TextInput
            ref={inputNewEmailRef}
            style={styles.input}
            onSubmitEditing={() => changeEmail()}
            keyboardType="email-address"
            mode="outlined"
            label="New E-mail"
            placeholder={"Create your new E-mail"}
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
            disabled={!!existsEmailToChange}
            selectTextOnFocus={true}
            right={
              !!existsEmailToChange && !load && 
                <TextInput.Icon 
                  style={{ marginTop: setSize(15)}}
                  name="close" 
                  color={colorsSocial.colorA3} 
                  onPress={() => cancelEmailPendingOfChange()}
                />
            }
            left={
              <TextInput.Icon 
                style={{ marginTop: setSize(15)}}
                name="at" 
                size={setSize(17)}
                color={colorsSocial.colorA4}
              />
            }
          />

          <If condition={!loadCancelEmailPending}>
            <If condition={!!existsEmailToChange}>
              <TextInput
                ref={inputCodeRef}
                style={styles.input}
                onSubmitEditing={() => validateCodeEmail()}
                mode="outlined"
                label="Code"
                placeholder={"Insert code to change E-mail"}
                value={code}
                onChangeText={(text) => setCode(text)}
                left={
                  <TextInput.Icon 
                    style={{ marginTop: setSize(15)}}
                    name="cached" 
                    size={setSize(17)}
                    color={colorsSocial.colorA4}
                  />
                }
              />
            </If>  
            <ButtonGradient
              style={styles.button}
              load={load}
              colors={[colorsSocial.colorA4, "#59518d"]}
              onPress={() => !existsEmailToChange ? changeEmail() : validateCodeEmail()}
              animationInitial={"fadeIn"}
              animationClick={"pulse"}
              label={!existsEmailToChange ? "SEND EMAIL" : "SEND CODE"}
            />
            <If condition={!!existsEmailToChange}>
              <Button
                  style={{ marginTop: setSize(10) }} 
                  onPress={() => resendCodeChangeEmail()}>
                  {"Resend code"}
              </Button>
            </If>
          </If>
        </View>
      </Modalize>
  );
};

export default memo(ModalAlterEmail);
