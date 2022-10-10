import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Text } from 'react-native-ui-lib';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      headerShown: false,
      flex: 1,
    })}
    sceneContainerStyle={{ backgroundColor: 'transparent' }}>
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
