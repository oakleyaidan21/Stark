import { Image } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { RedditUser } from 'snoowrap';

export interface UserRowProps {
  user: { pfpUrl: string; username: string };
}

const UserRow = ({ user }: UserRowProps) => {
  return (
    <View centerV height={40}>
      <View row centerV>
        <View
          width={30}
          height={30}
          center
          marginR-10
          style={{ borderRadius: 5 }}
          backgroundColor={'grey'}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{ uri: user.pfpUrl }}
          />
        </View>
        <Text>{user.username}</Text>
      </View>
    </View>
  );
};

export default UserRow;
