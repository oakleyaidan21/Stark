import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, LayoutAnimation } from 'react-native';
import { LoaderScreen, View } from 'react-native-ui-lib';
import StarkStatusBar from './components/StarkStatusBar';
import StarkContext from './context/StarkContext';
import useSnoowrap from './hooks/useSnoowrap';
import MainNavigator from './navigation/MainNavigator';
import useCurrentUser from './hooks/useCurrentUser';
import UserLoadingScreen from './screens/UserLoadingScreen';
import { useEffect } from 'react';

const Stark = () => {
  const { snoowrap, user, userSubs } = useSnoowrap();
  const { currentUser } = useCurrentUser();

  const userLoading = currentUser === undefined;
  const noUser = currentUser === null;

  useEffect(() => {
    if (snoowrap) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [snoowrap]);

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
          ) : userLoading || noUser ? (
            <View marginT-200>
              <LoaderScreen />
            </View>
          ) : (
            <UserLoadingScreen
              username={currentUser.username}
              pfpUrl={currentUser.pfpUrl}
            />
          )}
        </View>
      </View>
    </NavigationContainer>
  );
};

export default Stark;
