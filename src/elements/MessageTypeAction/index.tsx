import React, {memo} from 'react';
import {Text} from 'react-native';
import If from '../If';
import {IMessageTypeActionProps} from './types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setSize} from '../../helpers/responsive/Index';
import * as Animatable from 'react-native-animatable';

export const MessageTypeAction: React.FC<IMessageTypeActionProps> = (
  props,
): JSX.Element => {

  return (
    <If condition={!!props?.actionChat?.action?.trim()}>
      <Animatable.View
        style={{flexDirection: 'row', alignItems: 'center'}}
        // animation={'pulse'}
        // iterationCount={'infinite'}
        iterationDelay={1000}>
        <If condition={props?.actionChat?.action === 'text'}>
          <FontAwesome
            name={'keyboard-o'}
            size={15}
            color={props?.colorText}
          />
          <Text
            style={{
              fontSize: setSize(10),
              color: props?.colorText,
              marginLeft: setSize(3),
            }}>
            {'Typing...'}
          </Text>
        </If>
        <If condition={props?.actionChat?.action === 'audio'}>
          <MaterialCommunityIcons
            name={'microphone-outline'}
            size={setSize(15)}
            color={props?.colorText}
          />
          <Text style={{fontSize: setSize(10), color: props?.colorText}}>
            {'Audio...'}
          </Text>
        </If>
        <If condition={props?.actionChat?.action === 'video'}>
          <Ionicons
            name={'videocam-outline'}
            size={setSize(16)}
            color={props?.colorText}
          />
          <Text
            style={{
              fontSize: setSize(10),
              color: props?.colorText,
              marginLeft: setSize(3),
            }}>
            {'Video...'}
          </Text>
        </If>
      </Animatable.View>
    </If>
  );
};

export default memo(MessageTypeAction);
