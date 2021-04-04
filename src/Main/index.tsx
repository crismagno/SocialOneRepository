import React from 'react';
import App from './../navigation/Index';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './../reduxStore/store';
import { colorsSocial } from '../assets/general/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorsSocial.colorA4,
    accent: colorsSocial.colorA3,
    error: colorsSocial.colorA3,
  },
};

const Main: React.FC = (): JSX.Element => {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
};

export default Main;
