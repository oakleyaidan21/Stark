import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { View } from 'react-native-ui-lib';
import { Listing, Submission } from 'snoowrap';
import FullSubmission from '../components/FullSubmission';
import ScreenProps from '../types/ScreenProps';

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

  const onIndexChanged = useCallback(
    (newIndex: number) => {
      if (newIndex === actualSubmissions.length - 1) {
        fetchMore()
          .then(setActualSubmissions)
          .catch((error: any) => {
            Alert.alert('Error fetching more posts', error);
          });
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
