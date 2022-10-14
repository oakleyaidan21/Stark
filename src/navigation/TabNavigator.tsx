import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/tabs/HomeScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import MainTabBar from '../components/MainTabBar';
import TabHeader from '../components/TabHeader';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      flex: 1,
      header: TabHeader,
    })}
    sceneContainerStyle={{ backgroundColor: 'transparent' }}
    tabBar={MainTabBar}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
