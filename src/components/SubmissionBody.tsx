import React, { useCallback, useMemo } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import { determinePostType } from '../util/RedditUtil';
import SubmissionVideoPlayer from './SubmissionVideoPlayer';

interface SubmissionBodyProps {
  submission: Submission;
}

const SubmissionBody = ({ submission }: SubmissionBodyProps) => {
  const { url, selftext } = submission;

  const postType = useMemo(() => {
    return determinePostType(submission);
  }, [submission.id]);

  const renderSubmissionMedia = useCallback(() => {
    switch (postType.code) {
      case 'IMG':
        return (
          <Image
            source={{ uri: url }}
            progressiveRenderingEnabled
            resizeMode={'contain'}
            aspectRatio={1}
          />
        );
      case 'VID':
        return (
          <SubmissionVideoPlayer
            videoUrl={
              postType.fourExt == '.gifv'
                ? url.substring(0, url.length - 4) + 'mp4'
                : (submission.media?.reddit_video?.hls_url as string)
            }
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
            <Text>{selftext}</Text>
          </View>
        ) : null;

      default:
        return (
          <View height={150} center>
            <Text textColor>IMPL! {postType.code}</Text>
          </View>
        );
    }
  }, [submission.id]);

  return (
    <View bg-bgColor>
      {renderSubmissionMedia()}
      {/* <SubmissionActionBar submission={submission} /> */}
    </View>
  );
};

export default SubmissionBody;
