import { Appearance, Platform, StatusBar } from 'react-native';
import { View } from 'react-native-ui-lib';

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const colorScheme = Appearance.getColorScheme();

const StarkStatusBar = () => {
  return (
    <View bg-statusBarBg>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
    </View>
  );
};

export default StarkStatusBar;
