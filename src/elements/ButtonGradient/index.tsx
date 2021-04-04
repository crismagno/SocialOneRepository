import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import If from '../If';
import LoadCircle from '../LoadCircle';
import styles from './styles';
import { IButtonGradientProps } from './types';

const ButtonGradient: React.FC<IButtonGradientProps> = (props): JSX.Element => {
  const colors: string[] = props.colors || ['#ff3e89', '#9584ff'];

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 3.0}}
      locations={[0.3, 1.5]}
      colors={colors}
      style={[styles.linearGradient, props.style]}>
      <If condition={!props.load}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.onPress && props.onPress()}>
          <Text style={styles.buttonText}>
            {(props.label && props.toUpperCase && props.label.toUpperCase()) ||
              props.label ||
              'CLICK'}
          </Text>
        </TouchableOpacity>
      </If>
      <If condition={!!props.load}>
        <View style={styles.viewLoading}>
          <LoadCircle/>
        </View>
      </If>
    </LinearGradient>
  );
};

export default ButtonGradient;
