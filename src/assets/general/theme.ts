import {DefaultTheme} from 'react-native-paper';
import {colorsSocial} from '.';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorsSocial.colorA4,
    accent: colorsSocial.colorA3,
    error: colorsSocial.colorA3,
  },
};
