import React, { useCallback, useMemo } from 'react';
import { Image } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import { determinePostType } from '../util/RedditUtil';
import RGGifPlayer from './RGGifPlayer';
import ScaledImage from './ScaledImage';
import SubmissionVideoPlayer from './SubmissionVideoPlayer';

interface SubmissionBodyProps {
  submission: Submission;
  inView: boolean;
  inList?: boolean;
}

const SubmissionBody = ({
  submission,
  inView,
  inList,
}: SubmissionBodyProps) => {
  const { url, selftext } = submission;

  const postType = useMemo(() => {
    return determinePostType(submission);
  }, [submission.id]);

  const renderSubmissionMedia = useCallback(() => {
    switch (postType.code) {
      case 'IMG':
        return <ScaledImage url={url} />;
      case 'RED':
        return <RGGifPlayer url={url} shouldPlay={inView} inList={inList} />;
      case 'VID':
        return (
          <SubmissionVideoPlayer
            videoUrl={
              postType.fourExt == '.gifv'
                ? url.substring(0, url.length - 4) + 'mp4'
                : (submission.media?.reddit_video?.hls_url as string)
            }
            shouldPlay={inView}
          />
        );
      case 'WEB':
        return null;
      case 'SLF':
        return selftext && !inList ? (
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
  }, [submission.id, inView]);

  return (
    <View bg-bgColor>
      {renderSubmissionMedia()}
      {/* <SubmissionActionBar submission={submission} /> */}
    </View>
  );
};

export default SubmissionBody;
