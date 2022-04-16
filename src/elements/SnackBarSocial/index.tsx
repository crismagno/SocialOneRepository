import React from 'react';
import Snackbar from 'react-native-snackbar';
import { colorsSocial } from '../../assets/general';
import { ISnackBarSocialDefaultProps } from './types';

export const SnackBarSocialDefault = (configs: ISnackBarSocialDefaultProps) => {
  Snackbar.show({
    text: configs.text,
    textColor: configs.textColor,
    duration: Snackbar[configs.duration || "LENGTH_LONG"],
    action: {
      text: configs.textAction || "UNDO",
      textColor: configs.colorButton || colorsSocial.colorA1,
      onPress: () => configs.onPress && configs.onPress(),
    },
    backgroundColor: configs.backgroundColor
  });
}

export default SnackBarSocialDefault;