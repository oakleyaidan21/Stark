import { useNavigation } from '@react-navigation/native';
import { memo, useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Image, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import useGetSubredditIcon from '../hooks/useGetSubredditIcon';
import { abbreviateNumber, determinePostType } from '../util/RedditUtil';
import Flair from './Flair';

export interface SubmissionInfoProps {
  submission: Submission;
}

const SubmissionInfo = ({ submission }: SubmissionInfoProps) => {
  const {
    subreddit,
    author,
    title,
    link_flair_text,
    link_flair_background_color,
    link_flair_text_color,
    score,
    num_comments,
    thumbnail,
    url,
  } = submission;

  const subredditIcon = useGetSubredditIcon(subreddit);

  const goToSub = () => {
    (navigation as any).navigate('SubredditScreen', {
      subreddit: subreddit.display_name,
    });
  };

  const navigation = useNavigation();

  const thumbnailUrl =
    thumbnail === '' ||
    thumbnail === 'self' ||
    thumbnail === 'spoiler' ||
    thumbnail === 'nsfw' ||
    thumbnail === 'default' ||
    thumbnail === 'image'
      ? 'https://cdn.iconscout.com/icon/free/png-256/reddit-74-434748.png'
      : thumbnail;

  const postType = useMemo(() => {
    return determinePostType(submission);
  }, [submission.id]);

  const showThumbnail = postType.code !== 'SLF';

  return (
    <View padding-10 row>
      {/* sub, user, time */}
      <View flex>
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
            <TouchableWithoutFeedback onPress={goToSub}>
              <Text style={{ color: Colors.primary }}>
                {subreddit.display_name}
              </Text>
            </TouchableWithoutFeedback>
            <Text color={Colors.tertiaryText}> | </Text>
            <Text color={Colors.tertiaryText}>{author.name}</Text>
          </Text>
        </View>
        <View row>
          <View flex marginR-5>
            {/* title */}
            <View marginT-10>
              <Text style={{ fontSize: 16 }}>{title}</Text>
            </View>
            {/* flairs */}
            {link_flair_text && (
              <Flair
                text={link_flair_text}
                backgroundColor={link_flair_background_color}
                flairTextColor={link_flair_text_color}
                style={{ marginTop: 5 }}
              />
            )}
            {/* points, comments */}
            <View row centerV marginT-5>
              <Text bold style={{ fontSize: 16 }}>
                {abbreviateNumber(score)}
              </Text>
              <Text color={Colors.tertiaryText}> | </Text>
              <Text style={{ fontSize: 12 }} color={Colors.tertiaryText}>
                {abbreviateNumber(num_comments)}{' '}
                {num_comments === 1 ? 'comment' : 'comments'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {showThumbnail && (
        <TouchableWithoutFeedback
          onPress={() => (navigation as any).navigate('Web', { url: url })}>
          <Image
            source={{ uri: thumbnailUrl }}
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const propsAreEqual = (
  prevProps: SubmissionInfoProps,
  newProps: SubmissionInfoProps,
) => {
  return prevProps.submission.id === newProps.submission.id;
};

export default memo(SubmissionInfo, propsAreEqual);
