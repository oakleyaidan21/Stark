import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native-ui-lib';
import { RedditUser } from 'snoowrap';
import SubmissionListingContext from '../../context/SubmissionListingContext';
import useGetUserSubmissions from '../../hooks/useGetUserSubmissions';
import ScreenProps from '../../types/ScreenProps';
import ListingScroller from '../ListingScroller';

export interface UserPostListProps {
  user: RedditUser;
}

const UserPostList = ({ user }: UserPostListProps) => {
  const { loading, listing, fetchMore, refresh, refreshing } =
    useGetUserSubmissions(user);

  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const onItemPress = (index: number) => {
    if (listing) {
      navigation.push('PostSwiper', {
        initialIndex: index,
        submissions: listing,
        fetchMore: fetchMore,
      });
    }
  };

  return (
    <View flex>
      <SubmissionListingContext.Provider
        value={{
          refresh: refresh,
          refreshing: refreshing,
          listing: listing,
        }}>
        <View flex>
          <ListingScroller
            content={listing}
            header={null}
            onEndReached={fetchMore}
            onItemPress={onItemPress}
          />
        </View>
      </SubmissionListingContext.Provider>
    </View>
  );
};

export default UserPostList;
