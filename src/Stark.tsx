import { Text, View } from 'react-native-ui-lib';
import StarkContext from './context/StarkContext';
import useSnoowrap from './hooks/useSnoowrap';

const Stark = () => {
  const { snoowrap } = useSnoowrap();
  return (
    <View useSafeArea bg-bgColor>
      <StarkContext.Provider value={{ snoowrap: snoowrap }}>
        <Text>hi!</Text>
      </StarkContext.Provider>
    </View>
  );
};

export default Stark;
