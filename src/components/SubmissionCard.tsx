import { memo, useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import { Colors, Image, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import useGetSubredditIcon from '../hooks/useGetSubredditIcon';
import { determinePostType } from '../util/RedditUtil';
import Flair from './Flair';
import SubmissionActionBar from './SubmissionActionBar';
import SubmissionBody from './SubmissionBody';

export interface SubmissionCardProps {
  submission: Submission;
  inView: boolean;
}

const SubmissionCard = ({ submission, inView }: SubmissionCardProps) => {
  const {
    title,
    author,
    subreddit,
    link_flair_text,
    score,
    num_comments,
    link_flair_background_color,
    link_flair_text_color,
    thumbnail,
  } = submission;

  const thumbnailUrl =
    thumbnail == '' ||
    thumbnail === 'self' ||
    thumbnail === 'spoiler' ||
    thumbnail === 'nsfw' ||
    thumbnail === 'default'
      ? 'https://cdn.iconscout.com/icon/free/png-256/reddit-74-434748.png'
      : thumbnail;

  const subredditIcon = useGetSubredditIcon(subreddit);

  const postType = useMemo(() => {
    return determinePostType(submission);
  }, [submission.id]);

  const showThumbnail = postType.code === 'WEB';

  return (
    <View bg-bgColor>
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
            <Text color={Colors.tertiaryText}> | </Text>
            <Text color={Colors.tertiaryText}>{author.name}</Text>
          </Text>
        </View>
        <View row>
          <View flex>
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
          </View>
          {showThumbnail && (
            <Image
              source={{ uri: thumbnailUrl }}
              style={{ width: 70, height: 70, borderRadius: 5 }}
            />
          )}
        </View>
        {/* points, comments */}
        <View row centerV marginT-5>
          <Text bold style={{ fontSize: 16 }}>
            {score}
          </Text>
          <Text color={Colors.tertiaryText}> | </Text>
          <Text style={{ fontSize: 12 }} color={Colors.tertiaryText}>
            {num_comments} {num_comments === 1 ? 'comment' : 'comments'}
          </Text>
        </View>
      </View>
      {/* content */}
      <SubmissionBody submission={submission} inView={inView} />
      <SubmissionActionBar submission={submission} />
    </View>
  );
};

export default memo(SubmissionCard, (prevProps, newProps) => {
  return (
    prevProps.submission.id === newProps.submission.id &&
    prevProps.inView === newProps.inView
  );
});
