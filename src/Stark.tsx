import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native-ui-lib';
import StarkStatusBar from './components/StarkStatusBar';
import StarkContext from './context/StarkContext';
import useSnoowrap from './hooks/useSnoowrap';
import MainNavigator from './navigation/MainNavigator';

const Stark = () => {
  const { snoowrap } = useSnoowrap();
  return (
    <NavigationContainer>
      <View flex>
        <StarkStatusBar />
        <View useSafeArea bg-emptyBgColor flex>
          <StarkContext.Provider value={{ snoowrap: snoowrap }}>
            <MainNavigator />
          </StarkContext.Provider>
        </View>
      </View>
    </NavigationContainer>
  );
};

export default Stark;
