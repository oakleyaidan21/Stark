import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { View } from 'react-native-ui-lib';
import { Listing, Submission } from 'snoowrap';
import FullSubmission from '../components/FullSubmission';
import ScreenProps from '../types/ScreenProps';
import { determinePostType } from '../util/RedditUtil';

export type PostSwiperProps = NativeStackScreenProps<ScreenProps, 'PostSwiper'>;

const PostSwiper = ({
  route: {
    params: { submissions, fetchMore, initialIndex },
  },
}: PostSwiperProps) => {
  const [actualSubmissions, setActualSubmissions] =
    useState<Listing<Submission>>(submissions);

  const renderSubmissions = useCallback(() => {
    return actualSubmissions.map((submission, i) => (
      <FullSubmission key={submission.id + ' ' + i} submission={submission} />
    ));
  }, [actualSubmissions]);

  // on navigation, preload the next 5 post images
  useEffect(() => {
    prefetchFiveImages();
  }, [actualSubmissions]);

  // fetch the next 5 post's images, if they have them
  const prefetchFiveImages = () => {
    actualSubmissions.slice(0, 5).forEach(submission => {
      if (determinePostType(submission).code === 'IMG')
        Image.prefetch(submission.url);
    });
  };

  const onIndexChanged = useCallback(
    (newIndex: number) => {
      if (newIndex === actualSubmissions.length - 1) {
        fetchMore()
          .then(setActualSubmissions)
          .catch((error: any) => {
            Alert.alert('Error fetching more posts', error);
          });
      }
      // try prefetching the post that's 5 out
      if (newIndex + 5 < actualSubmissions.length - 1) {
        const submission = actualSubmissions[newIndex + 5];
        if (determinePostType(submission).code === 'IMG')
          Image.prefetch(submission.url);
      }
    },
    [actualSubmissions, setActualSubmissions],
  );

  return (
    <View flex>
      <Swiper
        loadMinimal
        onIndexChanged={onIndexChanged}
        showsPagination={false}
        loop={false}
        index={initialIndex}>
        {renderSubmissions()}
      </Swiper>
    </View>
  );
};

export default PostSwiper;
