import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native-ui-lib';
import StarkContext from './context/StarkContext';
import useSnoowrap from './hooks/useSnoowrap';
import MainNavigator from './navigation/MainNavigator';

const Stark = () => {
  const { snoowrap } = useSnoowrap();
  return (
    <NavigationContainer>
      <View useSafeArea bg-bgColor flex>
        <StarkContext.Provider value={{ snoowrap: snoowrap }}>
          <MainNavigator />
        </StarkContext.Provider>
      </View>
    </NavigationContainer>
  );
};

export default Stark;
