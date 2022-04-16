import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavigationAuth from './NavigationAuth';
import {useEffect} from 'react';
import {IndexActionsStore} from './../reduxStore';
import { startNotifications } from '../helpers/notifications';

const Init: React.FC = (): JSX.Element => {
  const {actionsSocket} = IndexActionsStore();

  const globalSocket = actionsSocket.socketStateStore?.socket;

  //to init the app set two methods 1. when mount app and 2. when destroyed app
  useEffect(() => {
    startNotifications(); // init call notifications
    actionsSocket.connectSocket();
    return () => {
      globalSocket?.off(`connect`);
      globalSocket?.off(`disconnect`);
      actionsSocket.disconnectSocket();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <NavigationAuth />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Init;
