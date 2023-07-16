import { Colors, View } from 'react-native-ui-lib';
import { Comment, Submission } from 'snoowrap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useVoteableContentActions from '../hooks/useVoteableContentActions';
import ContentActionSheet from './ContentActionSheet';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

interface ContentActionBarProps {
  content: Submission | Comment;
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

  const navigation = useNavigation();

  const [actionSheetVisible, setActionSheetVisible] = useState(false);

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
      <Icon
        name="comment-text-outline"
        size={small ? 20 : 23}
        color={'grey'}
        onPress={() =>
          navigation.navigate('CreateCommentScreen', { content: content })
        }
      />
      <Icon
        name="dots-vertical"
        size={small ? 20 : 23}
        color={'grey'}
        onPress={() => setActionSheetVisible(true)}
      />
      <ContentActionSheet
        visible={actionSheetVisible}
        setVisible={setActionSheetVisible}
        content={content}
      />
    </View>
  );
};

export default ContentActionBar;
