import React, {memo, useEffect, useRef, useState} from 'react';
import {View, Text, Image, Animated, TouchableOpacity} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import {setSize} from './../../helpers/responsive/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ICardLlistPeopleProps} from './types';
import If from './../../elements/If';
import {getFileByPath} from '../../helpers/files';
import {images} from '../../assets/general';
import CardAvatar from '../../elements/CardAvatar';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

export const CardListPeople: React.FC<ICardLlistPeopleProps> = ({
  avatar,
  colorComponents,
  onPressCard,
  textSubtitle,
  textTitle,
  animationDuration = 500,
  animationInitial,
  animationPress,
  iconButtonRight,
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
      animationButtonRef.current?.animate(animationInitial, animationDuration);
    }
  }, []);

  const animationButtonRef = useRef(null);

  const [avatarComponent, setAvatarComponent] = useState<any>(
    avatar && {uri: getFileByPath(avatar)},
  );

  const handlePressCard = async (): Promise<void> => {
    if (animationPress) {
      await animationButtonRef.current?.animate(animationPress, 150);
    }

    onPressCard();
  };

  return (
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
              onError={(error: any): void =>
                error && setAvatarComponent(images.avatars[0])
              }
            />
          ) : (
            <CardAvatar />
          )}

          <If condition={online !== undefined && online !== null}>
            <Animatable.View
              style={styles.viewOnline(
                online,
                colorComponents,
              )}></Animatable.View>
          </If>
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
              <Text
                style={styles.textLastMessage(colorComponents)}
                numberOfLines={1}>
                {textSubtitle}
              </Text>
            </TouchableOpacity>
          </If>
        </View>

        <View style={styles.cardListChatEnd}>
          <If condition={!!iconButtonRight}>
            <AnimatedTouchableOpacity
              activeOpacity={0.7}
              onPress={() => onPressCard()}
              style={styles.buttonRight}>
              <Ionicons
                name={iconButtonRight}
                color={colorComponents}
                size={setSize(25)}
              />
            </AnimatedTouchableOpacity>
          </If>
        </View>
      </AnimatedTouchableOpacity>
    </Animatable.View>
  );
};

export default memo(CardListPeople);
