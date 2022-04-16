import React, { memo } from 'react';
import styles from './styles';
import {setSize} from '../../helpers/responsive/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IIconMessageTypeProps} from './types';
import If from '../If';

export const IconMessageType: React.FC<IIconMessageTypeProps> = (
  props,
): JSX.Element => {
  return (
    <>
      <If condition={!props.messageIsDisabled && props.type === 'image'}>
        <Ionicons
          style={styles.icon}
          name={'image-outline'}
          size={setSize(15)}
          color={props.colorIcon}
        />
      </If>
      <If condition={!props.messageIsDisabled && props.type === 'video'}>
        <Ionicons
          style={styles.icon}
          name={'videocam-outline'}
          size={setSize(15)}
          color={props.colorIcon}
        />
      </If>
      <If condition={!props.messageIsDisabled && props.type === 'audio'}>
        <Ionicons
          style={styles.icon}
          name={'musical-notes-outline'}
          size={setSize(15)}
          color={props.colorIcon}
        />
      </If>
      <If condition={!props.messageIsDisabled && props.type === 'document'}>
        <Ionicons
          style={styles.icon}
          name={'document-outline'}
          size={setSize(15)}
          color={props.colorIcon}
        />
      </If>
      <If condition={!props.messageIsDisabled && props.type === 'figure'}>
        <Ionicons
          style={styles.icon}
          name={'chatbox-ellipses-outline'}
          size={setSize(15)}
          color={props.colorIcon}
        />
      </If>
      <If condition={!props.messageIsDisabled && props.type === 'microphone'}>
        <MaterialCommunityIcons
          style={styles.icon}
          name={'microphone-outline'}
          size={setSize(15)}
          color={props.colorIcon}
        />
      </If>
      <If condition={props.messageIsDisabled}>
        <Ionicons
          style={styles.icon}
          name={'trash-sharp'}
          size={setSize(15)}
          color={props.colorIcon}
        />
      </If>
    </>
  );
};

export default memo(IconMessageType);
