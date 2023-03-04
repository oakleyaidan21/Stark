import { Image, TouchableNativeFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';

export interface XPostCardProps {
  submission: Submission;
  onPress: () => void;
}

const XPostCard = ({ submission, onPress }: XPostCardProps) => {
  const { title, thumbnail, subreddit, author } = submission;

  const thumbnailUrl =
    thumbnail === '' ||
    thumbnail === 'self' ||
    thumbnail === 'spoiler' ||
    thumbnail === 'nsfw' ||
    thumbnail === 'default' ||
    thumbnail === 'image'
      ? 'https://cdn.iconscout.com/icon/free/png-256/reddit-74-434748.png'
      : thumbnail;

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        row
        padding-10
        style={{ borderColor: Colors.borderColor, borderWidth: 1 }}>
        <Image
          source={{ uri: thumbnailUrl }}
          style={{ width: 50, height: 50, borderRadius: 5 }}
        />
        <View marginL-10 flex>
          <Text>
            <Text color={Colors.tertiaryText}>{subreddit.display_name}</Text>
            <Text color={Colors.tertiaryText}> | </Text>
            <Text color={Colors.tertiaryText}>{author.name}</Text>
          </Text>
          <Text numberOfLines={2}>{title}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default XPostCard;
