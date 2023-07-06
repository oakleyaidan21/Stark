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
  const { fullUser, errored } = useGetRedditUser(name, user);

  return fullUser ? (
    <User info={fullUser} />
  ) : errored ? (
    <View flex center>
      <Text>
        Error getting reddit user with name <Text bold>{name}</Text>
      </Text>
    </View>
  ) : (
    <View marginT-200>
      <LoaderScreen />
    </View>
  );
};

export default UserScreen;
