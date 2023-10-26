import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { navOptionHandler } from '@services/functions';
import { SignUp, SignIn } from '@screens';

const StackAuth = createStackNavigator();
export default AuthStack = () => {
  return (
    <StackAuth.Navigator initialRouteName='SignIn' screenOptions={{ gestureEnabled: false }}>
      <StackAuth.Screen name='SignUp' component={SignUp} options={navOptionHandler} />
      <StackAuth.Screen name='SignIn' component={SignIn} options={navOptionHandler} />
    </StackAuth.Navigator>
  );
};