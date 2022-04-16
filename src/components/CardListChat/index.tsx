import React, {memo, useEffect, useRef, useState} from 'react';
import {View, Text, Image, Animated, TouchableOpacity} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import {ICardLlistChatProps} from './types';
import If from './../../elements/If';
import {images} from '../../assets/general';
import IconMessageType from '../../elements/IconMessageType';
import TextMessageType from '../../elements/TextMessageType';
import MessageTypeAction from '../../elements/MessageTypeAction';
import HoursMessage from '../../elements/HoursMessage';
import {getFileByPath} from '../../helpers/files';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import StatusSendMessage from '../../elements/StatusSendMessage';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

export const CardListChat: React.FC<ICardLlistChatProps> = (props): JSX.Element => {
  useEffect(() => {
    if (props.animationInitial) {
      animationButtonRef.current?.animate(
        props.animationInitial,
        props.animationDuration || 500,
      );
    }
  }, []);

  useEffect(() => {
    setAvatar(
      props?.avatar ? {uri: getFileByPath(props?.avatar)} : images.avatars[0],
    );
  }, [props?.avatar]);

  const colorText = props?.colorComponents;
  const [avatar, setAvatar] = useState(
    props?.avatar ? {uri: getFileByPath(props?.avatar)} : images.avatars[0],
  );
  const animationButtonRef = useRef(null);

  const onPressCard = (): void => {
    if (props.animationPress) {
      animationButtonRef.current.animate(props.animationPress, 150);
    }
    props.onPressCard && props.onPressCard();
  };

  const onErrorAvatar = (error: any): void => {
    if (error) setAvatar(images.avatars[0]);
  };

  return (
    <>
      {/* <Swipeable renderRightActions={renderRightActions}> */}
      <Animatable.View ref={animationButtonRef}>
        <AnimatedTouchableOpacity
          onPress={() => onPressCard()}
          activeOpacity={0.9}
          style={[styles.cardListChat, props.style]}>
          <TouchableOpacity activeOpacity={0.9} style={styles.containerImage}>
            <Image
              style={styles.avatar}
              source={avatar}
              onError={onErrorAvatar}
            />
            <Animatable.View
              style={styles.viewOnline(props.online, colorText)}
            />
          </TouchableOpacity>
          <View style={styles.boxOfListCenter}>
            <If condition={!!props.textTitle}>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.textNameChat(colorText)} numberOfLines={1}>
                  {props.textTitle}
                </Text>
              </TouchableOpacity>
            </If>
            <If condition={!!props.textSubtitle}>
              <TouchableOpacity style={styles.containerLastMessage}>
                <IconMessageType
                  type={props.typeMessage}
                  colorIcon={colorText}
                  messageIsDisabled={props?.messageIsDisabled}
                />
                <TextMessageType
                  colorText={colorText}
                  type={props.typeMessage}
                  valueText={props?.textSubtitle}
                  messageIsDisabled={props?.messageIsDisabled}
                />
                <If condition={props?.showStatusMessage}>
                  <StatusSendMessage statusSendMessage={props?.statusSendMessage} />
                </If>
              </TouchableOpacity>
            </If>
            <MessageTypeAction
              actionChat={props?.actionChat}
              colorText={colorText}
            />
          </View>
          <View style={styles.cardListChatEnd}>
            <AnimatedTouchableOpacity
              activeOpacity={0.7}
              onPress={() => onPressCard()}
              style={styles.buttonHourLastMessage(colorText)}>
              <HoursMessage colorText={colorText} date={props?.hoursMessage} />
            </AnimatedTouchableOpacity>
          </View>
        </AnimatedTouchableOpacity>
      </Animatable.View>
      {/* </Swipeable>  */}
    </>
  );
};

export default memo(CardListChat);
