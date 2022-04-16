import React, {memo, useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Modalize} from 'react-native-modalize';
import {setSize} from '../../../../helpers/responsive/Index';
import {TextInput} from 'react-native-paper';
import {colorsSocial} from '../../../../assets/general';
import ButtonGradient from '../../../../elements/ButtonGradient';
import {IndexActionsStore} from '../../../../reduxStore';
import {user as userService} from '../../../../services';
import {errorHandling} from '../../../../helpers/global';
import localStorage from '../../../../infra/localStorage';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { SnackBarSocialDefault } from "./../../../../elements/SnackBarSocial";

export interface IModalAlterFullNameProps {
  show: boolean;
  onClose: () => void;
}

const ModalAlterFullName: React.FC<IModalAlterFullNameProps> = (
  props,
): JSX.Element => {
  
  // event to show modal
  useEffect(() => {
    animationShow();
  }, [props.show]);

  // actions state store
  const {actionsUser} = IndexActionsStore();
  const user = actionsUser?.state;

  const modalizeRef = useRef<Modalize>(null);
  const inputNewFullNameRef = useRef<TextInputProps>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [newFullName, setNewFullName] = useState<string>(user?.fullName);

  const animationShow = async (): Promise<void> => {
    if (props.show) {
      modalizeRef?.current?.open();
      setTimeout(() => inputNewFullNameRef?.current?.focus(), 100);
    } else {
      modalizeRef?.current?.close();
      initVariablesByComponent();
    };
  };

  const updateFullName = async (): Promise<void> => {
    try {
      setLoad(true);
      const response = await userService.updateProfileInfo(
        user._id,
        'fullName',
        newFullName,
      );
      actionsUser.updateProfileInfo('fullName', newFullName);
      await localStorage.updatePropertyUser('fullName', newFullName);
      setNewFullName("");
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

  const initVariablesByComponent = () => {
    setNewFullName(user?.fullName);
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
        <View style={styles.headerComponentContainer}>
          <Text style={styles.textTitle}>{'Alter Full Name'}</Text>
        </View>
      }>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Current Full Name"
          value={user.fullName}
          disabled
          left={
            <TextInput.Icon 
              style={{ marginTop: setSize(15)}}
              name="account" 
              size={setSize(20)}
              color={"#0005"}
            />
          }
        />

        <TextInput
          ref={inputNewFullNameRef}
          style={styles.input}
          onSubmitEditing={() => updateFullName()}
          mode="outlined"
          label="New Full Name"
          placeholder={'Create your new Full Name'}
          value={newFullName}
          onChangeText={(text) => setNewFullName(text)}
          disabled={load}
          selectTextOnFocus={true}
          left={
            <TextInput.Icon 
              style={{ marginTop: setSize(15)}}
              name="account" 
              size={setSize(20)}
              color={colorsSocial.colorA4}
            />
          }
        />
        <ButtonGradient
          style={styles.button}
          load={load}
          colors={[colorsSocial.colorA4, '#59518d']}
          onPress={() => updateFullName()}
          animationInitial={'fadeIn'}
          animationClick={'pulse'}
          label={'SEND'}
        />
      </View>
    </Modalize>
  );
};

export default memo(ModalAlterFullName);
