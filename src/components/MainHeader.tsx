import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View, Text } from 'react-native-ui-lib';

const MainHeader = (props: NativeStackHeaderProps) => {
  const { route } = props;
  return <View width={'100%'} height={50} bg-bgColor></View>;
};

export default MainHeader;
