import React from 'react';

import RegisterScreen from './screens/RegisterScreen'
import ChatScreen from './screens/ChatScreen'
import LoginScreen from './screens/LoginScreen'
import CallScreen from './screens/CallScreen'
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Call"
        component={CallScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>;
}
registerRootComponent(App);