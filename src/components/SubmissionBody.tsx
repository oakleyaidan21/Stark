import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import { determinePostType, onLinkPress } from '../util/RedditUtil';
import MDRenderer from './MDRenderer';
import RGGifPlayer from './RGGifPlayer';
import ScaledImage from './ScaledImage';
import SubmissionInfo from './SubmissionInfo';
import SubmissionVideoPlayer from './SubmissionVideoPlayer';
import XPostCard from './XPostCard';

interface SubmissionBodyProps {
  submission: Submission;
}

const SubmissionBody = ({ submission }: SubmissionBodyProps) => {
  const { url, selftext, selftext_html } = submission;

  const navigation = useNavigation();

  const postType = useMemo(() => {
    return determinePostType(submission);
  }, [submission.id]);

  const renderSubmissionMedia = useCallback(() => {
    switch (postType.code) {
      case 'IMG':
        return <ScaledImage url={url} />;
      case 'RED':
        return <RGGifPlayer url={url} shouldPlay={false} />;
      case 'VID':
        return (
          <SubmissionVideoPlayer
            videoUrl={
              postType.fourExt == '.gifv'
                ? url.substring(0, url.length - 4) + 'mp4'
                : (submission.media?.reddit_video?.hls_url as string)
            }
            shouldPlay={false}
          />
        );
      case 'WEB':
        return null;
      case 'SLF':
        return selftext ? (
          <View
            bg-selfTextBgColor
            margin-5
            style={{ borderRadius: 3 }}
            padding-5>
            <MDRenderer
              data={selftext_html ?? ''}
              onLinkPress={(url: string) => onLinkPress(url, navigation)}
            />
          </View>
        ) : null;
      case 'XPT':
        return (
          <XPostCard
            submission={postType.xpst}
            onPress={() =>
              navigation.push('Submission', { submission: postType.xpst })
            }
          />
        );
      default:
        return (
          <View height={150} center>
            <Text textColor>IMPL! {postType.code}</Text>
          </View>
        );
    }
  }, [submission.id]);

  return <View bg-bgColor>{renderSubmissionMedia()}</View>;
};

export default SubmissionBody;
