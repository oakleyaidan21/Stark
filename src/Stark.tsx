import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native-ui-lib';
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
          {snoowrap ? (
            <StarkContext.Provider
              value={{ snoowrap: snoowrap, user: user, userSubs: userSubs }}>
              <MainNavigator />
            </StarkContext.Provider>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
    </NavigationContainer>
  );
};

export default Stark;
