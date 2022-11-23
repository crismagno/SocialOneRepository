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
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardAvatar from '../../elements/CardAvatar';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

export const CardListChat: React.FC<ICardLlistChatProps> = ({
  actionChat,
  avatar,
  colorComponents,
  onPressCard,
  showStatusMessage,
  statusSendMessage,
  textSubtitle,
  textTitle,
  typeMessage,
  animationDuration,
  animationInitial,
  animationPress,
  hoursMessage,
  messageIsDisabled,
  online,
  style,
}): JSX.Element => {
  useEffect(() => {
    if (avatar) {
      setAvatarComponent({uri: getFileByPath(avatar)});
    }
  }, [avatar]);

  useEffect(() => {
    if (animationInitial) {
      animationButtonRef.current?.animate(
        animationInitial,
        animationDuration || 500,
      );
    }
  }, []);

  const [avatarComponent, setAvatarComponent] = useState<any>(
    avatar && {uri: getFileByPath(avatar)},
  );
  const animationButtonRef = useRef(null);

  const handlePressCard = (): void => {
    if (animationPress) {
      animationButtonRef.current.animate(animationPress, 150);
    }

    onPressCard();
  };

  return (
    <>
      {/* <Swipeable
        renderRightActions={() => (
          <Ionicons name={'videocam-outline'} size={16} />
        )}> */}
      <Animatable.View ref={animationButtonRef}>
        <AnimatedTouchableOpacity
          onPress={handlePressCard}
          activeOpacity={0.9}
          style={[styles.cardListChat, style]}>
          <TouchableOpacity activeOpacity={0.9} style={styles.containerImage}>
            {avatarComponent ? (
              <Image
                style={styles.avatar}
                source={avatarComponent}
                onError={(error) =>
                  error && setAvatarComponent(images.avatars[0])
                }
              />
            ) : (
              <CardAvatar />
            )}

            <Animatable.View
              style={styles.viewOnline(online, colorComponents)}
            />
          </TouchableOpacity>

          <View style={styles.boxOfListCenter}>
            <If condition={!!textTitle}>
              <TouchableOpacity activeOpacity={0.5}>
                <Text
                  style={styles.textNameChat(colorComponents)}
                  numberOfLines={1}>
                  {textTitle}
                </Text>
              </TouchableOpacity>
            </If>

            <If condition={!!textSubtitle}>
              <TouchableOpacity style={styles.containerLastMessage}>
                <IconMessageType
                  type={typeMessage}
                  colorIcon={colorComponents}
                  messageIsDisabled={messageIsDisabled}
                />

                <TextMessageType
                  colorText={colorComponents}
                  type={typeMessage}
                  valueText={textSubtitle}
                  messageIsDisabled={messageIsDisabled}
                />

                <If condition={showStatusMessage}>
                  <StatusSendMessage statusSendMessage={statusSendMessage} />
                </If>
              </TouchableOpacity>
            </If>

            <MessageTypeAction
              actionChat={actionChat}
              colorText={colorComponents}
            />
          </View>

          <View style={styles.cardListChatEnd}>
            <AnimatedTouchableOpacity
              activeOpacity={0.7}
              onPress={handlePressCard}
              style={styles.buttonHourLastMessage(colorComponents)}>
              <HoursMessage colorText={colorComponents} date={hoursMessage} />
            </AnimatedTouchableOpacity>
          </View>
        </AnimatedTouchableOpacity>
      </Animatable.View>
      {/* </Swipeable> */}
    </>
  );
};

export default memo(CardListChat);
