import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {ImageBackground, View, TouchableOpacity} from 'react-native';
import {colorsSocial, images} from './../../../../assets/general/index';
import styles from './styles';
import {getFileByPath} from '../../../../helpers/files';
import {IAvatarWithDescriptionProps} from './types';
import * as Animatable from 'react-native-animatable';
import {setSize} from '../../../../helpers/responsive/Index';
import Draggable from 'react-native-draggable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import If from './../../../../elements/If';
import ButtonGradient from '../../../../elements/ButtonGradient';
import CardAvatar from '../../../../elements/CardAvatar';

const AvatarWithDescription: React.FC<IAvatarWithDescriptionProps> = ({
  cancelImage,
  imageAvatar,
  onChooseAvatar,
  onChooseAvatarCamera,
  onConfirmChangeAvatar,
  user,
  imageAvatarLoad,
}): JSX.Element => {
  const [isDrag, setIsDrag] = useState<boolean>(false);

  useEffect(() => {
    if (user?.avatar && user.avatar !== 'null') {
      setAvatarComponent({uri: getFileByPath(user?.avatar)});
    }
  }, [user?.avatar]);

  const [avatarComponent, setAvatarComponent] = useState<any>(
    user?.avatar !== 'null' &&
      !!user?.avatar && {uri: getFileByPath(user?.avatar)},
  );

  const handleDragRelease = (event: any): void => {
    setIsDrag(false);

    if (event.nativeEvent.locationX <= 30) {
      onChooseAvatarCamera();
    }

    if (event.nativeEvent.locationX >= 200) {
      onChooseAvatar();
    }
  };

  return (
    <Animatable.View style={styles.container(user?.online)}>
      <If condition={isDrag}>
        <Ionicons
          style={{position: 'absolute', left: 40, top: 130}}
          name={'camera-outline'}
          size={setSize(30)}
          color={colorsSocial.colorA1}
        />

        <Ionicons
          style={{position: 'absolute', right: 40, top: 130}}
          name={'image-outline'}
          size={setSize(30)}
          color={colorsSocial.colorA1}
        />
      </If>

      <Draggable
        x={setSize(100)}
        y={setSize(60)}
        maxX={380}
        minX={10}
        maxY={300}
        minY={10}
        onDrag={() => setIsDrag(true)}
        shouldReverse={true}
        onDragRelease={handleDragRelease}>
        <Animatable.View animation={'slideInDown'} duration={500}>
          <TouchableOpacity
            style={styles.containerImageBackgroundButton(avatarComponent)}
            activeOpacity={0.8}>
            {imageAvatar || avatarComponent ? (
              <ImageBackground
                style={styles.containerImageBackground}
                imageStyle={styles.containerImageBackground}
                source={imageAvatar || avatarComponent}
                onError={(error) =>
                  error && setAvatarComponent(images.avatars[0])
                }></ImageBackground>
            ) : (
              <CardAvatar size={150} />
            )}

            <Animatable.View
              animation={'zoomIn'}
              delay={500}
              style={styles.viewOnline(user?.online, colorsSocial.colorA1)}
            />
          </TouchableOpacity>
        </Animatable.View>
      </Draggable>

      <If condition={!isDrag && imageAvatar}>
        <ButtonGradient
          style={styles.buttonConfirm}
          iconLeft={
            <Ionicons
              name={'checkmark'}
              size={setSize(20)}
              color={colorsSocial.colorA1}
            />
          }
          load={imageAvatarLoad}
          colors={[colorsSocial.colorA4, colorsSocial.colorA3]}
          locationLinearGradient={[0.0, 1]}
          onPress={() => onConfirmChangeAvatar()}
          animationInitial={'fadeIn'}
          animationClick={'rotate'}
        />

        <ButtonGradient
          style={styles.buttonClose}
          iconLeft={
            <Ionicons
              name={'close'}
              size={setSize(20)}
              color={colorsSocial.colorA1}
            />
          }
          colors={[colorsSocial.colorA4, colorsSocial.colorA3]}
          locationLinearGradient={[0.0, 1]}
          onPress={() => cancelImage()}
          animationInitial={'fadeIn'}
          animationClick={'rotate'}
        />
      </If>

      <Animatable.Text style={{position: 'absolute', left: 10, bottom: 10}} />
    </Animatable.View>
  );
};

export default memo(AvatarWithDescription);
