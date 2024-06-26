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
import UserScreen from '../screens/UserScreen';
import CreateCommentScreen from '../screens/CreateCommentScreen';

enableScreens();
const Stack = createNativeStackNavigator<ScreenProps>();

const showHeader = (name: string) => {
  switch (name) {
    case 'Tabs':
    case 'Web':
      return false;
    default:
      return true;
  }
};
const MainNavigator = () => {
  return (
    <View flex>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: showHeader(route.name),
          contentStyle: { backgroundColor: Colors.emptyBgColor },
          animation: 'fade',
          header: MainHeader,
        })}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="PostSwiper" component={PostSwiper} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="UserSubScreen" component={UserSubScreen} />
        <Stack.Screen name="Submission" component={SubmissionScreen} />
        <Stack.Screen name="SubredditScreen" component={SubredditScreen} />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Web" component={Web} />
        <Stack.Screen
          name="CreateCommentScreen"
          component={CreateCommentScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default MainNavigator;
