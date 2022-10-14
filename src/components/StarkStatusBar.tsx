import { Appearance, Platform, StatusBar } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const colorScheme = Appearance.getColorScheme();

const StarkStatusBar = () => {
  return (
    <View bg-statusBarBg height={STATUSBAR_HEIGHT}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
    </View>
  );
};

export default StarkStatusBar;
