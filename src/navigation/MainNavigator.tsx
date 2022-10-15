import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native-ui-lib';
import TabNavigator from './TabNavigator';
import SubmissionScreen from '../screens/SubmissionScreen';
import ScreenProps from '../types/ScreenProps';
import MainHeader from '../components/MainHeader';
import LoginScreen from '../screens/LoginScreen';

enableScreens();
const Stack = createNativeStackNavigator<ScreenProps>();

const MainNavigator = () => {
  return (
    <View flex>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'Tabs',
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_right',
          header: MainHeader,
        })}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Submission" component={SubmissionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default MainNavigator;