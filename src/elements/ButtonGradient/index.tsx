import React, { useEffect, useRef } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import If from '../If';
import LoadCircle from '../LoadCircle';
import styles from './styles';
import { IButtonGradientProps } from './types';
import * as Animatable from "react-native-animatable";

const AnimatableLinearGradient = Animatable.createAnimatableComponent(LinearGradient);

const ButtonGradient: React.FC<IButtonGradientProps> = (props): JSX.Element => {
  const colors: string[] = props.colors || ['#ff3e89', '#9584ff'];
  const animationButtonRef: React.MutableRefObject<any> = useRef(null);
  
  useEffect(() => {
    if (props.animationInitial) {
      const animation = animationButtonRef.current[`${props.animationInitial}`]
      animation(props.durationAnimationInitial || 500);
    }
  }, []);

  const onPress = async (): Promise<void> => {
    if (props.animationClick) {
      const animation = await animationButtonRef.current[`${props.animationClick}`]
      animation(300, 1);
      props.onPress && props.onPress();
    }
  }
  
  return (
    <AnimatableLinearGradient
      ref={animationButtonRef}
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 3.0}}
      locations={[0.3, 1.5]}
      colors={colors}
      style={[styles.linearGradient, props.style]}>
      <If condition={!props.load}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => onPress()}>
          <If condition={!!props.iconLeft}>
            {props.iconLeft}
          </If>
          <If condition={!!props.label}>
            <Text style={styles.buttonText}>
              {props.toUpperCase && props.label.toUpperCase() || props.label}
            </Text>
          </If>
          <If condition={!!props.iconRight}>
            {props.iconRight}
          </If>
        </TouchableOpacity>
      </If>
      <If condition={!!props.load}>
        <View style={styles.viewLoading}>
          <LoadCircle/>
        </View>
      </If>
    </AnimatableLinearGradient>
  );
};

export default ButtonGradient;
