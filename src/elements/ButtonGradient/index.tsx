import React, {memo, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import If from '../If';
import LoadCircle from '../LoadCircle';
import styles from './styles';
import {IButtonGradientProps} from './types';
import * as Animatable from 'react-native-animatable';
import {colorsSocial} from '../../assets/general';
import LoadGif from '../LoadGif';

const AnimatableLinearGradient = Animatable.createAnimatableComponent(
  LinearGradient,
);

export const ButtonGradient: React.FC<IButtonGradientProps> = (props): JSX.Element => {
  const colors: string[] = props.colors || [colorsSocial.colorA3, colorsSocial.colorA4];
  const animationButtonRef: React.MutableRefObject<any> = useRef(null);

  useEffect(() => {
    if (props.animationInitial) {
      animationButtonRef.current?.animate(
        props.animationInitial,
        props.durationAnimationInitial || 500,
      );
    }
  }, []);

  const onPress = async (): Promise<void> => {
    if (props.animationClick) {
      await animationButtonRef.current?.animate(props.animationClick, 300, 1);
      props.onPress && props.onPress();
    }
  };

  return (
    <AnimatableLinearGradient
      ref={animationButtonRef}
      start={props.startLinearGradient || {x: 0.0, y: 0.25}}
      end={props.endLinearGradient || {x: 0.5, y: 3.0}}
      locations={props.locationLinearGradient || [0.3, 1.5]}
      colors={colors}
      style={[styles.linearGradient, props.style]}>
      <If condition={!props.load}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => onPress()}>
          <If condition={!!props.iconLeft}>{props.iconLeft}</If>
          <If condition={!!props.label}>
            <Text style={styles.buttonText}>
              {(props?.toUpperCase && props?.label.toUpperCase()) ||
                props.label}
            </Text>
          </If>
          <If condition={!!props.iconRight}>{props.iconRight}</If>
        </TouchableOpacity>
      </If>
      <If condition={!!props.load}>
        <View style={styles.viewLoading}>
          {/* <LoadCircle
            color={props.loadColor || colorsSocial.colorA1}
            size={props.sizeLoad || 15}
          /> */}
          <LoadGif 
            size={props?.sizeLoad || 20}
            type={props.typeLoad || +0}
          />
        </View>
      </If>
    </AnimatableLinearGradient>
  );
};

export default memo(ButtonGradient);
