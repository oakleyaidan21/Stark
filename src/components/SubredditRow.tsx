import { Colors, Text, View } from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import useGetSubredditIcon from '../hooks/useGetSubredditIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

export interface SubredditRowProps {
  subreddit: Subreddit | string;
  iconName?: string;
}

const iconSize = 38;

const SubredditRow = ({ subreddit, iconName }: SubredditRowProps) => {
  const isSub = typeof subreddit !== 'string';
  const display_name = isSub ? subreddit.display_name : subreddit;
  const iconUrl = useGetSubredditIcon(subreddit);

  return (
    <View row centerV>
      {iconName ? (
        <View
          bg-primary
          center
          marginR-10
          style={{
            borderRadius: iconSize / 2,
            width: iconSize,
            height: iconSize,
          }}>
          <Icon name={iconName} size={23} color={Colors.white} />
        </View>
      ) : (
        <FastImage
          source={{ uri: iconUrl }}
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize / 2,
            marginRight: 10,
          }}
        />
      )}
      <Text>{display_name}</Text>
    </View>
  );
};

export default SubredditRow;
