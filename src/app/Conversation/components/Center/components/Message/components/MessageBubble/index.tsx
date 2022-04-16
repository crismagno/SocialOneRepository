import React, {useEffect, memo, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {colorsSocial} from '../../../../../../../../assets/general';
import moment from 'moment';
import 'moment/dist/locale/en-in';
import {IUserInitialState} from '../../../../../../../../reduxStore/user/types';
import If from '../../../../../../../../elements/If';
import LoadCircle from '../../../../../../../../elements/LoadCircle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setSize} from '../../../../../../../../helpers/responsive/Index';
import Tts from 'react-native-tts';
import { IMessageProps } from '../../types';
import { IChatSchema } from '../../../../../../../../services/chat/types';

// parte da fala
// Tts.setDefaultPitch(1);
// Tts.setIgnoreSilentSwitch("ignore");
// Tts.addEventListener('tts-start', (event) => console.log("start", event));
// Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
// Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

const AnimatableLinearGradient = Animatable.createAnimatableComponent(
  LinearGradient,
);
export interface IMessageBubble extends IMessageProps {
  user: IUserInitialState;
  onEventMessage: () => void;
  chatData: IChatSchema;
}

const MessageBubble: React.FC<IMessageBubble> = (props): JSX.Element => {
  Tts.setDefaultLanguage('pt-BR');

  // user login on this application
  const user = props.user;

  let [scale, setScale] = useState<number>(1);
  let [showBottomSub, setShowBottomSub] = useState<boolean>(false);

  var color2 = '#5347a3';
  var color1 = '#6eb0ce';

  // cores do balao de mensagem
  const colorsBubble: string[] =
    props?.userSent == user._id
      ? [colorsSocial.colorA4, colorsSocial.colorA3]
      : [color1, color2];
  // estilos do balao de mensagem
  const isUserMain = props?.userSent == user._id;
  const styleBubble = styles.bubble(isUserMain, scale);
  const animationBubbleRef: React.MutableRefObject<any> = useRef(null);
  const messageIsDisabledToMe = props.removeToUsers?.indexOf(user?._id) > -1;

  const speakContent = (text: string) => {
    Tts.speak(text, {
      androidParams: {
        KEY_PARAM_PAN: 0,
        KEY_PARAM_VOLUME: 0.8,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
      rate: 0.1,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setShowBottomSub(!showBottomSub)}
      onLongPress={() => props?.onEventMessage()}>
      <AnimatableLinearGradient
        ref={animationBubbleRef}
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 3.0}}
        locations={[0.0, 1]}
        colors={colorsBubble}
        style={styleBubble.container}
        animation={isUserMain ? 'fadeInRight' : 'fadeInLeft'}
        duration={700}>
        <If condition={!messageIsDisabledToMe}>
          <Animatable.View style={styleBubble.bubbleContent}>
            <Animatable.Text style={styleBubble.bubbleContentText}>
              {props?.value}
            </Animatable.Text>
          </Animatable.View>

          {/* parte de baixo da mensagem */}
          <Animatable.View style={styleBubble.bubbleBottom}>
            <Animatable.Text style={styleBubble.textDate}>
              {moment(props?.createdAt).format('LT')}
            </Animatable.Text>
            <Animatable.Text style={styleBubble.contentCheckSend}>

              {/* se for mensagem temporaria */}
              <If condition={!!props.message_id_temp}>
                <If condition={props.message_send_error}>
                  <Ionicons
                    name={'alert-outline'}
                    size={setSize(11)}
                    color={colorsSocial.colorA1}
                  />
                </If>
                <If condition={!props.message_send_error}>
                  <LoadCircle color={colorsSocial.colorA1} size={8} />
                </If>
              </If>

              {/* se nao for mensagem temporaria e tiver sido enviada */}
              <If condition={!props.message_id_temp && user?._id === props?.userSent}>
                <If condition={props?.seenUsers?.length < props?.chatData?.users?.length}>
                  <Ionicons
                    name={'md-checkmark-sharp'}
                    size={setSize(13)}
                    color={colorsSocial.colorA1}
                  />
                </If>
                <If condition={props?.seenUsers?.length >= props?.chatData?.users?.length}>
                  <Ionicons
                    name={'md-checkmark-done'}
                    size={setSize(13)}
                    color={colorsSocial.colorA8}
                  />
                </If>
              </If>
              
              {/* fix bubble */}
              <View />
            </Animatable.Text>
          </Animatable.View>

          {/* acoes diversas da mensagem */}
          <If condition={showBottomSub}>
            <Animatable.View
              animation={'fadeInRight'}
              duration={500}
              style={styleBubble.bubbleBottomSub}>
              <If condition={props?.type === 'text'}>
                <TouchableOpacity onPress={() => speakContent(props?.value)}>
                  <FontAwesome
                    name={'assistive-listening-systems'}
                    size={setSize(13)}
                    color={colorsSocial.colorA1}
                  />
                </TouchableOpacity>
              </If>
              {/* <TouchableOpacity
                style={{marginLeft: setSize(3)}}
                onPress={() => {}}>
                <Ionicons
                  name={'eye-outline'}
                  size={setSize(13)}
                  color={colorsSocial.colorA1}
                />
              </TouchableOpacity> */}
            </Animatable.View>
          </If>
        </If>
        
         {/* mensagem desabilitada */}
        <If condition={messageIsDisabledToMe}>
          <Animatable.View style={styleBubble.bubbleContentRemoved}>
            <Ionicons
              style={styleBubble.bubbleContentIconRemoved}
              name={'trash-sharp'}
              size={setSize(20)}
            />
            <Animatable.Text style={styleBubble.bubbleContentTextRemoved}>
              {'Message was removed'}
            </Animatable.Text>
          </Animatable.View>
        </If>
      </AnimatableLinearGradient>
    </TouchableOpacity>
  );
};

export default memo(MessageBubble);
