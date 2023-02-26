import { Colors, View } from 'react-native-ui-lib';
import { Comment, Submission, VoteableContent } from 'snoowrap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useVoteableContentActions from '../hooks/useVoteableContentActions';

interface ContentActionBarProps {
  content: VoteableContent<Submission | Comment>;
  size?: string;
}

const ContentActionBar = ({ content, size = 'lg' }: ContentActionBarProps) => {
  const {
    upvoted,
    downvoted,
    saved,
    upvoting,
    downvoting,
    saving,
    upvote,
    downvote,
    save,
  } = useVoteableContentActions(content);

  const small = size === 'sm';

  return (
    <View row height={small ? 20 : 40} paddingH-10 spread centerV>
      <Icon
        name="arrow-up-bold-outline"
        size={small ? 20 : 23}
        color={upvoted ? Colors.upvoted : 'grey'}
        disabled={upvoting}
        onPress={upvote}
      />
      <Icon
        name="arrow-down-bold-outline"
        size={small ? 20 : 23}
        color={downvoted ? Colors.downvoted : 'grey'}
        disabled={downvoting}
        onPress={downvote}
      />
      <Icon
        name="star-outline"
        size={small ? 20 : 23}
        color={saved ? Colors.primary : 'grey'}
        disabled={saving}
        onPress={save}
      />
      <Icon name="comment-text-outline" size={small ? 20 : 23} color={'grey'} />
      <Icon name="dots-vertical" size={small ? 20 : 23} color={'grey'} />
    </View>
  );
};

export default ContentActionBar;