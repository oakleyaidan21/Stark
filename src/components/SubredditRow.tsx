import { Image } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import useGetSubredditIcon from '../hooks/useGetSubredditIcon';

export interface SubredditRowProps {
  subreddit: Subreddit | string;
}

const SubredditRow = ({ subreddit }: SubredditRowProps) => {
  const isSub = typeof subreddit !== 'string';
  const display_name = isSub ? subreddit.display_name : subreddit;
  const iconUrl = useGetSubredditIcon(subreddit);

  return (
    <View row centerV>
      <Image
        source={{ uri: iconUrl }}
        style={{ width: 30, height: 30, borderRadius: 15, marginRight: 5 }}
      />
      <Text>{display_name}</Text>
    </View>
  );
};

export default SubredditRow;
