import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native-ui-lib';
import SearchHeader from './headers/tabHeaders/SearchHeader';

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
    case 'Search':
      return <SearchHeader />;
    default:
      return null;
  }
};

export default TabHeader;
