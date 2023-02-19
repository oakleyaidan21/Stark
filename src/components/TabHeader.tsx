import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native-ui-lib';
import HomeHeader from './tabHeaders/HomeHeader';
import SearchHeader from './tabHeaders/SearchHeader';

const TabHeader = (props: BottomTabHeaderProps) => {
  const { route } = props;
  return (
    <View height={50} bg-bgColor center>
      {getContentForRoute(route.name)}
    </View>
  );
};

const getContentForRoute = (route: string) => {
  switch (route) {
    case 'Home':
      return <HomeHeader />;
    case 'Search':
      return <SearchHeader />;
    default:
      return null;
  }
};

export default TabHeader;
