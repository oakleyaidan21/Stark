import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, View } from 'react-native-ui-lib';
import TabNavigator from './TabNavigator';
import SubmissionScreen from '../screens/SubmissionScreen';
import ScreenProps from '../types/ScreenProps';
import MainHeader from '../components/MainHeader';
import LoginScreen from '../screens/LoginScreen';
import Web from '../screens/Web';
import SubredditScreen from '../screens/SubredditScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import PostSwiper from '../screens/PostSwiper';
import UserSubScreen from '../screens/UserSubScreen';

enableScreens();
const Stack = createNativeStackNavigator<ScreenProps>();

const MainNavigator = () => {
  return (
    <View flex>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'Tabs',
          contentStyle: { backgroundColor: Colors.emptyBgColor },
          animation:
            route.name === 'UserSubScreen' ? 'fade' : 'slide_from_right',
          header: MainHeader,
        })}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="PostSwiper" component={PostSwiper} />
        <Stack.Screen name="UserSubScreen" component={UserSubScreen} />
        <Stack.Screen name="Submission" component={SubmissionScreen} />
        <Stack.Screen name="SubredditScreen" component={SubredditScreen} />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Web" component={Web} />
      </Stack.Navigator>
    </View>
  );
};

export default MainNavigator;
