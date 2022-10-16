import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/tabs/HomeScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import MainTabBar from '../components/MainTabBar';
import TabHeader from '../components/TabHeader';
import { Colors } from 'react-native-ui-lib';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      flex: 1,
      header: TabHeader,
      headerShown: route.name !== 'Home',
    })}
    tabBar={props => <MainTabBar {...props} />}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
