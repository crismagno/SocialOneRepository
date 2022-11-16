import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavigationAuth from './NavigationAuth';
import {useEffect} from 'react';
import {IndexActionsStore} from './../reduxStore';
import {startNotifications} from '../helpers/notifications';

const NavigationIndex: React.FC = (): JSX.Element => {
  const {actionsSocket} = IndexActionsStore();

  const globalSocket = actionsSocket.socketStateStore?.socket;

  /**
   * To start app set two methods,
   *  1. when mount app.
   *  2. when destroyed app
   */
  useEffect(() => {
    /**
     * Start call notifications
     */
    startNotifications();

    /**
     * Start Socket
     */
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

export default NavigationIndex;
