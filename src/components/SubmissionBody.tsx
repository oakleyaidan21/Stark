import React, { useCallback, useMemo } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import { determinePostType } from '../util/RedditUtil';
// import MDRenderer from './MDRenderer';
// import SubmissionActionBar from './SubmisisonActionBar';
// import VideoPlayer from './VideoPlayer';

interface SubmissionBodyProps {
  submission: Submission;
}

const SubmissionBody = ({ submission }: SubmissionBodyProps) => {
  const { url } = submission;

  const postType = useMemo(() => {
    return determinePostType(submission);
  }, [submission.id]);

  const canvas = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  const renderSubmissionMedia = useCallback(() => {
    switch (postType.code) {
      case 'IMG':
        return (
          <Image
            source={{ uri: url }}
            // resizeMode={'contain'}
            // resizeMethod={'scale'}
            // width={100}
            progressiveRenderingEnabled
            resizeMode={'contain'}
            aspectRatio={1}
          />
        );
      //   case 'VID':
      //     return (
      //       <View height={500}>
      //         <VideoPlayer
      //           url={
      //             postType.fourExt == '.gifv'
      //               ? url.substring(0, url.length - 4) + 'mp4'
      //               : (submission.media?.reddit_video?.hls_url as string)
      //           }
      //         />
      //       </View>
      //     );
      case 'WEB':
        return null;
      //   case 'SLF':
      //     return (
      //       <View>
      //         <MDRenderer
      //           html={submission.selftext_html ? submission.selftext_html : ''}
      //           onLinkPress={() => {}}
      //         />
      //       </View>
      //     );
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
