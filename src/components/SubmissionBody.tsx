import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import ScreenProps from '../types/ScreenProps';
import {
  determinePostType,
  mapRedditGalleryImages,
  onLinkPress,
} from '../util/RedditUtil';
import GalleryViewer from './ImageGallery';
import MDRenderer from './MDRenderer';
import RGGifPlayer from './RGGifPlayer';
import ScaledImage from './ScaledImage';
import SubmissionVideoPlayer from './SubmissionVideoPlayer';
import XPostCard from './XPostCard';
import RGImage from './RGImage';

interface SubmissionBodyProps {
  submission: Submission;
}

const SubmissionBody = ({ submission }: SubmissionBodyProps) => {
  const { url, selftext, selftext_html, spoiler } = submission;

  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const postType = useMemo(() => {
    return determinePostType(submission);
  }, [submission.id]);

  const renderSubmissionMedia = useCallback(() => {
    switch (postType.code) {
      case 'IMG':
      case 'GIF':
        return (
          <ScaledImage
            url={url}
            isSpoiler={spoiler}
            selfText={submission.selftext_html}
          />
        );
      case 'RED':
        return <RGGifPlayer url={url} shouldPlay={false} />;
      case 'RED_I':
        return <RGImage url={url} />;
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
              navigation.push('Submission', { id: postType.xpst.id })
            }
          />
        );
      case 'GAL':
        return <GalleryViewer images={mapRedditGalleryImages(submission)} />;
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
