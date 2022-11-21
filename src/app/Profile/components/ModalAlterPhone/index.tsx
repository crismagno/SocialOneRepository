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
import {getMessageError} from '../../../../helpers/global';
import localStorage from '../../../../infra/localStorage';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import TextInputMask from 'react-native-text-input-mask';
import {SnackBarSocialDefault} from './../../../../elements/SnackBarSocial';

export interface IModalAlterPhoneProps {
  show: boolean;
  onClose: () => void;
}

const ModalAlterPhone: React.FC<IModalAlterPhoneProps> = (
  props,
): JSX.Element => {
  // event to show modal
  useEffect(() => {
    if (props.show) {
      modalizeRef?.current?.open();
      setTimeout(() => inputNewPhoneRef?.current?.focus(), 100);
    } else {
      modalizeRef?.current?.close();
    }
  }, [props.show]);

  // actions state store
  const {actionsUser} = IndexActionsStore();
  const user = actionsUser?.state;

  const modalizeRef = useRef<Modalize>(null);
  const inputNewPhoneRef = useRef<TextInputProps>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [newPhone, setNewPhone] = useState<string>(user?.phone);

  const updatePhone = async (): Promise<void> => {
    try {
      setLoad(true);
      const response = await userService.updateProfileInfo(
        user._id,
        'phone',
        newPhone,
      );
      actionsUser.updateProfileInfo('phone', newPhone);
      await localStorage.updatePropertyUser('phone', newPhone);
      setNewPhone('');
      SnackBarSocialDefault({
        text: response.message,
        colorButton: colorsSocial.colorA4,
      });
      props.onClose();
    } catch (error) {
      SnackBarSocialDefault({
        text: getMessageError(error),
        colorButton: colorsSocial.colorA3,
        textColor: colorsSocial.colorA3,
      });
    } finally {
      setLoad(false);
    }
  };

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
            {'Alter Phone'}
          </Text>
        </View>
      }>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Current Phone"
          value={user.phone}
          disabled
          left={
            <TextInput.Icon
              style={{marginTop: setSize(15)}}
              name="phone"
              size={setSize(20)}
              color={'#0005'}
            />
          }
        />

        <TextInput
          ref={inputNewPhoneRef}
          style={styles.input}
          onSubmitEditing={() => updatePhone()}
          keyboardType="phone-pad"
          mode="outlined"
          label="New Phone"
          value={newPhone}
          onChangeText={(text) => setNewPhone(text)}
          render={(props) => (
            <TextInputMask {...props} mask="+[00] ([00]) [0] [0000]-[0000]" />
          )}
          placeholder="+55 (99) 9 9999-9999"
          disabled={load}
          selectTextOnFocus={true}
          left={
            <TextInput.Icon
              style={{marginTop: setSize(15)}}
              name="phone"
              size={setSize(20)}
              color={colorsSocial.colorA4}
            />
          }
        />
        <ButtonGradient
          style={styles.button}
          load={load}
          colors={[colorsSocial.colorA4, '#59518d']}
          onPress={() => updatePhone()}
          animationInitial={'fadeIn'}
          animationClick={'pulse'}
          label={'SEND'}
        />
      </View>
    </Modalize>
  );
};

export default memo(ModalAlterPhone);
