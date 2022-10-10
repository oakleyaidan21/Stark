import { memo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';

interface SubmissionListCardProps {
  submission: Submission;
}

const SubmissionListCard = ({ submission }: SubmissionListCardProps) => {
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

  return (
    <TouchableNativeFeedback onPress={() => console.log('press!')}>
      <View>
        <View marginT-10 bg-white padding-10>
          {/* sub, user, time */}
          <View row centerV>
            <View
              width={20}
              height={20}
              style={{ borderRadius: 10 }}
              backgroundColor={'lightgray'}
              marginR-5
            />
            <Text style={{ color: Colors.primary }}>
              {subreddit.display_name}
            </Text>
            <Text> | </Text>
            <Text color-tertiaryText>{author.name}</Text>
          </View>
          {/* title */}
          <View marginT-10>
            <Text>{title}</Text>
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
            <Text>{score}</Text>
            <Text> | </Text>
            <Text>
              {num_comments} {num_comments === 1 ? 'comment' : 'comments'}
            </Text>
          </View>
        </View>
        {/* content */}
        <View height={100} bg-black></View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default memo(SubmissionListCard, (prevProps, newProps) => {
  return prevProps.submission.id === newProps.submission.id;
});
