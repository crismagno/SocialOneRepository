import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Conversation from '../app/Conversation';

const Stack = createStackNavigator();

const NavigationConversation: React.FC = (): JSX.Element => (
  <Stack.Navigator
    initialRouteName="Conversation"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Conversation" component={Conversation} />
  </Stack.Navigator>
);

export default NavigationConversation;
