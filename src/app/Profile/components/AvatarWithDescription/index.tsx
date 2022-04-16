import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {ImageBackground, View, TouchableOpacity} from 'react-native';
import {colorsSocial, images} from './../../../../assets/general/index';
import styles from './styles';
import {getFileByPath} from '../../../../helpers/files';
import {IAvatarWithDescriptionProps} from './types';
import * as Animatable from 'react-native-animatable';
import { setSize } from '../../../../helpers/responsive/Index';
import Draggable from 'react-native-draggable';
import Ionicons from "react-native-vector-icons/Ionicons";
import If from "./../../../../elements/If";
import ButtonGradient from '../../../../elements/ButtonGradient';
import IndexActionsStore from '../../../../reduxStore';

const AvatarWithDescription: React.FC<IAvatarWithDescriptionProps> = (
  props,
): JSX.Element => {

  // actions state store
  const {actionsProfile} = IndexActionsStore();
  
  const [isDrag, setIsDrag] = useState<boolean>(false);
  
  // verify if avatar change and set new value
  useEffect(() => {
    setAvatar(
      props.user?.avatar !== 'null' && !!props.user?.avatar
        ? {uri: getFileByPath(props.user?.avatar)}
        : images.avatars[0],
    );
  }, [props?.user?.avatar]);

  const [avatar, setAvatar] = useState(
    props.user?.avatar !== 'null' && !!props.user?.avatar
      ? {uri: getFileByPath(props.user?.avatar)}
      : images.avatars[0],
  );

  const onErrorAvatar = useCallback((error: any): void => {
    if (error) setAvatar(images.avatars[0]);
  }, []);

  const onDrag = useCallback((event: any): void => {
    setIsDrag(true);
    // actionsProfile.setValuesDragAvatar({ 
    //   x: event.nativeEvent.locationX,
    //   y: event.nativeEvent.locationY
    // })
  }, []);

  const onDragRelease = useCallback((event): void => {
    setIsDrag(false);
    if (event.nativeEvent.locationX <= 30) {
      props.onChooseAvatarCamera();
    }
    
    if (event.nativeEvent.locationX >= 200) {
      props.onChooseAvatar();
    }
  }, []);

  return (
    <Animatable.View style={styles.container(props.user?.online)}>
      <If condition={isDrag}>
        <Ionicons 
          style={{ position: "absolute", left: 40, top: 130 }}
          name={"camera-outline"} 
          size={setSize(30)} 
          color={colorsSocial.colorA1}
        />
        <Ionicons 
          style={{ position: "absolute", right: 40, top: 130 }}
          name={"image-outline"} 
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
        onDrag={onDrag}
        shouldReverse={true}
        onDragRelease={onDragRelease}
      >
        <Animatable.View
          animation={'slideInDown'}
          duration={500}
        >
          <TouchableOpacity
            style={styles.containerImageBackgroundButton}
            activeOpacity={0.8}
          >
            <ImageBackground
              style={styles.containerImageBackground}
              imageStyle={styles.containerImageBackground}
              source={props.imageAvatar || avatar}
              onError={onErrorAvatar}>
              <Animatable.View
                animation={'zoomIn'}
                delay={500}
                style={styles.viewOnline(props.user?.online, colorsSocial.colorA1)}
              />
            </ImageBackground>
          </TouchableOpacity>
        </Animatable.View>
      </Draggable>
      <If condition={!isDrag && props.imageAvatar}>
        <ButtonGradient
          style={styles.buttonConfirm}
          iconLeft={
            <Ionicons
              name={"checkmark"} 
              size={setSize(20)} 
              color={colorsSocial.colorA1}
            />
          }
          load={props.imageAvatarLoad}
          colors={[colorsSocial.colorA4, colorsSocial.colorA3]}
          locationLinearGradient={[0.0, 1]}
          onPress={() => props.onConfirmChangeAvatar()}
          animationInitial={'fadeIn'}
          animationClick={'rotate'}
        />

        <ButtonGradient
          style={styles.buttonClose}
          iconLeft={
            <Ionicons
              name={"close"} 
              size={setSize(20)} 
              color={colorsSocial.colorA1}
            />
          }
          colors={[colorsSocial.colorA4, colorsSocial.colorA3]}
          locationLinearGradient={[0.0, 1]}
          onPress={() => props.cancelImage()}
          animationInitial={'fadeIn'}
          animationClick={'rotate'}
        />
      </If>
      <Animatable.Text style={{ position: "absolute", left: 10, bottom: 10 }}>
      </Animatable.Text>
    </Animatable.View>
  );
};

export default memo(AvatarWithDescription);
