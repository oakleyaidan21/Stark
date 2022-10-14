import { memo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import useGetSubredditIcon from '../hooks/useGetSubredditIcon';
import SubmissionActionBar from './SubmissionActionBar';
import SubmissionBody from './SubmissionBody';

interface SubmissionListCardProps {
  submission: Submission;
  onPress: () => undefined;
  inView: boolean;
}

const SubmissionListCard = ({
  submission,
  onPress,
  inView,
}: SubmissionListCardProps) => {
  const {
    title,
    author,
    subreddit,
    link_flair_text,
    score,
    num_comments,
    link_flair_background_color,
    link_flair_text_color,
  } = submission;

  const flairTextColor =
    link_flair_text_color === 'dark'
      ? 'black'
      : link_flair_text_color === 'light'
      ? 'white'
      : link_flair_text_color;

  const subredditIcon = useGetSubredditIcon(subreddit);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View marginB-10 bg-bgColor>
        <View padding-10>
          {/* sub, user, time */}
          <View row centerV>
            <FastImage
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                marginRight: 5,
              }}
              source={{ uri: subredditIcon }}
            />
            <Text style={{ fontSize: 12 }}>
              <Text style={{ color: Colors.primary }}>
                {subreddit.display_name}
              </Text>
              <Text> | </Text>
              <Text color-tertiaryText>{author.name}</Text>
            </Text>
          </View>
          {/* title */}
          <View marginT-10>
            <Text style={{ fontSize: 16 }}>{title}</Text>
          </View>
          {/* flairs */}
          {link_flair_text && (
            <View
              marginT-10
              padding-5
              style={{
                backgroundColor: link_flair_background_color,
                borderRadius: 3,
              }}>
              <Text color={flairTextColor} style={{ fontSize: 10 }}>
                {link_flair_text}
              </Text>
            </View>
          )}
          {/* points, comments */}
          <View row centerV marginT-10>
            <Text bold style={{ fontSize: 16 }}>
              {score}
            </Text>
            <Text> | </Text>
            <Text style={{ fontSize: 12 }}>
              {num_comments} {num_comments === 1 ? 'comment' : 'comments'}
            </Text>
          </View>
        </View>
        {/* content */}
        <SubmissionBody submission={submission} inView={inView} />
        <SubmissionActionBar submission={submission} />
      </View>
    </TouchableNativeFeedback>
  );
};

export default memo(SubmissionListCard, (prevProps, newProps) => {
  return (
    prevProps.submission.id === newProps.submission.id &&
    prevProps.inView === newProps.inView
  );
});
