import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native-ui-lib';
import { RedditUser } from 'snoowrap';
import StarkStatusBar from './components/StarkStatusBar';
import StarkContext from './context/StarkContext';
import useSnoowrap from './hooks/useSnoowrap';
import MainNavigator from './navigation/MainNavigator';

const Stark = () => {
  const { snoowrap, user, userSubs } = useSnoowrap();

  return (
    <NavigationContainer>
      <View flex bg-bgColor>
        <StarkStatusBar />
        <View useSafeArea flex>
          <StarkContext.Provider
            value={{ snoowrap: snoowrap, user: user, userSubs: userSubs }}>
            <MainNavigator />
          </StarkContext.Provider>
        </View>
      </View>
    </NavigationContainer>
  );
};

export default Stark;
