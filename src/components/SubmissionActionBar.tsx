import { Colors, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Alert } from 'react-native';
import useVoteableContentActions from '../hooks/useVoteableContentActions';

interface SubmissionActionBarProps {
  submission: Submission;
}

const SubmissionActionBar = ({ submission }: SubmissionActionBarProps) => {
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
  } = useVoteableContentActions(submission);

  return (
    <View row height={40} paddingH-10 spread centerV>
      <Icon
        name="arrow-up-bold-outline"
        size={23}
        color={upvoted ? Colors.upvoted : 'grey'}
        disabled={upvoting}
        onPress={upvote}
      />
      <Icon
        name="arrow-down-bold-outline"
        size={23}
        color={downvoted ? Colors.downvoted : 'grey'}
        disabled={downvoting}
        onPress={downvote}
      />
      <Icon
        name="star-outline"
        size={23}
        color={saved ? Colors.primary : 'grey'}
        disabled={saving}
        onPress={save}
      />
      <Icon name="comment-text-outline" size={23} color={'grey'} />
      <Icon name="dots-vertical" size={23} color={'grey'} />
    </View>
  );
};

export default SubmissionActionBar;
