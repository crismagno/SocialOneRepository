import React, {memo, useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Modalize} from 'react-native-modalize';
import {setSize} from '../../../../helpers/responsive/Index';
import {colorsSocial} from '../../../../assets/general';
import ButtonGradient from '../../../../elements/ButtonGradient';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { IModalRemoveMessagesProps } from './types';
import If from '../../../../elements/If';

const ModalRemoveMessages: React.FC<IModalRemoveMessagesProps> = (
  props,
): JSX.Element => {
  
  // event to show modal
  useEffect(() => {
    animationShow();
  }, [props.show]);

  const modalizeRef = useRef<Modalize>(null);
  const inputNewFullNameRef = useRef<TextInputProps>(null);
  const [load, setLoad] = useState<boolean>(false);

  const animationShow = async (): Promise<void> => {
    if (props.show) {
      modalizeRef?.current?.open();
      setTimeout(() => inputNewFullNameRef?.current?.focus(), 100);
    } else {
      modalizeRef?.current?.close();
    };
  };

  return (
    <Modalize
      ref={modalizeRef}
      onClosed={props.onClose}
      snapPoint={setSize(280)}
      rootStyle={{elevation: 5}}
      keyboardAvoidingBehavior={'padding'}
      modalHeight={280}
      HeaderComponent={
        <View style={styles.headerComponentContainer}>
          <Text style={styles.textTitle}>{'Remove Messages'}</Text>
        </View>
      }>
      <View style={styles.container}>
        <ButtonGradient
          style={styles.button}
          load={load}
          colors={[colorsSocial.colorA4, colorsSocial.colorA6]}
          onPress={() => props?.onRemoveMessages("ONLY_TO_ME")}
          animationInitial={'fadeIn'}
          animationClick={'pulse'}
          label={'ONLY TO ME'}
        />
        <If condition={!props?.existMessageOthersUsers}>
          <ButtonGradient
            style={styles.button}
            load={load}
            colors={[colorsSocial.colorA4, colorsSocial.colorA6]}
            onPress={() => props?.onRemoveMessages("ALL_USERS")}
            animationInitial={'fadeIn'}
            animationClick={'pulse'}
            label={'ALL USERS'}
          />
        </If>
        <ButtonGradient
          style={styles.button}
          load={load}
          colors={[colorsSocial.colorA4, colorsSocial.colorA6]}
          onPress={props?.onClose}
          animationInitial={'fadeIn'}
          animationClick={'pulse'}
          label={'CANCEL'}
        />
      </View>
    </Modalize>
  );
};

export default memo(ModalRemoveMessages);
