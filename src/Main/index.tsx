import React from 'react';
import NavigationIndex from '../navigation/Index';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from '../reduxStore/store';
import {theme} from '../assets/general';

const Main: React.FC = (): JSX.Element => {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationIndex />
      </Provider>
    </PaperProvider>
  );
};

export default Main;
