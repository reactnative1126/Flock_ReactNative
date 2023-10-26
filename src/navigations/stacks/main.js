import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { navOptionHandler } from '@services/functions';
import { First, Home, Setting, Analytics, ChartView } from '@screens';

const StackMain = createStackNavigator();
export default MainStack = () => {
  return (
    <StackMain.Navigator initialRouteName='First' screenOptions={{ gestureEnabled: false }}>
      <StackMain.Screen name='First' component={First} options={navOptionHandler} />
      <StackMain.Screen name='Home' component={Home} options={navOptionHandler} />
      <StackMain.Screen name='Setting' component={Setting} options={navOptionHandler} />
      <StackMain.Screen name='Analytics' component={Analytics} options={navOptionHandler} />
      <StackMain.Screen name='ChartView' component={ChartView} options={navOptionHandler} />
    </StackMain.Navigator>
  );
};