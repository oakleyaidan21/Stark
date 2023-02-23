import { useState } from 'react';
import { Alert } from 'react-native';
import { VoteableContent } from 'snoowrap';

const ARCHIVED_WARNING =
  'This content is archived and can no longer be voted on';

const useVoteableContentActions = (content: VoteableContent<any>) => {
  const [upvoted, setUpvoted] = useState(content.likes);
  const [upvoting, setUpvoting] = useState(false);
  const [downvoted, setDownvoted] = useState(content.likes === false);
  const [downvoting, setDownvoting] = useState(false);
  const [saved, setSaved] = useState(content.saved);
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    const doSave = () => (saved ? content.unsave() : content.save());

    doSave()
      .then(() => setSaved(!saved))
      .catch(() => Alert.alert('Error saving'))
      .finally(() => setSaving(false));
  };

  const upvote = () => {
    if (content.archived) {
      Alert.alert(ARCHIVED_WARNING);
      return;
    }
    setUpvoting(true);
    const doUpvote = () => (upvoted ? content.unvote() : content.upvote());

    doUpvote()
      .then(() => setUpvoted(!upvoted))
      .catch(() => Alert.alert('Error upvoting'))
      .finally(() => {
        setUpvoting(false);
        setDownvoted(false);
      });
  };

  const downvote = () => {
    if (content.archived) {
      Alert.alert(ARCHIVED_WARNING);
      return;
    }
    setDownvoting(true);
    const doDownvote = () =>
      downvoted ? content.unvote() : content.downvote();

    doDownvote()
      .then(() => setDownvoted(!downvoted))
      .catch(() => Alert.alert('Error downvoting'))
      .finally(() => {
        setDownvoting(false);
        setUpvoted(false);
      });
  };

  return {
    upvoted,
    downvoted,
    saved,
    upvoting,
    downvoting,
    saving,
    upvote,
    downvote,
    save,
  };
};

export default useVoteableContentActions;
