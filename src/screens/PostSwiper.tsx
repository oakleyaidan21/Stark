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
  const [currIndex, setCurrIndex] = useState(initialIndex);

  const renderSubmissions = useCallback(() => {
    return actualSubmissions.map((submission, i) => (
      <FullSubmission
        key={submission.id}
        submission={submission}
        visible={i === currIndex}
      />
    ));
  }, [actualSubmissions, currIndex]);

  const onIndexChanged = (newIndex: number) => {
    setCurrIndex(newIndex);
    if (newIndex === actualSubmissions.length - 1) {
      fetchMore()
        .then(setActualSubmissions)
        .catch((error: any) => {
          Alert.alert('Error fetching more posts', error);
        });
    }
  };

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
