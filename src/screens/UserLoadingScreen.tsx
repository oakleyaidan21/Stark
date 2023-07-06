import { ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Text, View } from 'react-native-ui-lib';

export interface UserLoadingScreenProps {
  username: string;
  pfpUrl: string;
}

const UserLoadingScreen = ({ username, pfpUrl }: UserLoadingScreenProps) => {
  return (
    <View flex center>
      <FastImage
        source={{ uri: pfpUrl }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 10,
          backgroundColor: 'gray',
        }}
      />
      <Text bold marginV-10>
        {username}
      </Text>
      <ActivityIndicator color={Colors.oBgColor} />
      <View height={200} />
    </View>
  );
};

export default UserLoadingScreen;
