import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native-ui-lib';
import TabNavigator from './TabNavigator';
import SubmissionScreen from '../screens/SubmissionScreen';

enableScreens();
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <View flex>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_right',
        })}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Submission" component={SubmissionScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default MainNavigator;
