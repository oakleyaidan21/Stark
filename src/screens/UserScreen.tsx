import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoaderScreen, Text, View } from 'react-native-ui-lib';
import User from '../components/User';
import useGetRedditUser from '../hooks/useGetRedditUser';
import ScreenProps from '../types/ScreenProps';

const UserScreen = ({
  route: {
    params: { name, user },
  },
}: NativeStackScreenProps<ScreenProps, 'UserScreen'>) => {
  const { fullUser } = useGetRedditUser(name, user);

  return fullUser ? (
    <User info={fullUser} />
  ) : (
    <View marginT-200>
      <LoaderScreen />
    </View>
  );
};

export default UserScreen;
