import { Colors, Image, Text, View } from 'react-native-ui-lib';
import { RedditUser } from 'snoowrap';
import UserTabs from './UserTabs';

export interface UserProps {
  info: RedditUser;
}

const User = ({ info }: UserProps) => {
  const { name, link_karma, comment_karma, icon_img } = info;
  return (
    <View flex bg-bgColor>
      <View style={{ position: 'relative' }}>
        {/* Background Image */}
        <View backgroundColor={Colors.primary} height={100} />
        {/* Name, karma, etc */}
        <View padding-10 marginT-30>
          <Text bold style={{ fontSize: 20 }}>
            {name}
          </Text>
          <Text color={Colors.tertiaryText}>{link_karma} link karma</Text>
          <Text color={Colors.tertiaryText}>{comment_karma} comment karma</Text>
        </View>
        {/* Profile image absolutely positioned */}
        <View style={{ position: 'absolute', top: 65, left: 10 }}>
          <Image
            source={{ uri: icon_img }}
            style={{
              height: 70,
              width: 70,
              backgroundColor: Colors.primary,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: Colors.textColor,
            }}
          />
        </View>
      </View>
      <UserTabs user={info} />
    </View>
  );
};

export default User;
