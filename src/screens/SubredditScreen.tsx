import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoaderScreen, View } from 'react-native-ui-lib';
import SubredditHeader from '../components/headers/SubredditHeader';
import ListingScroller from '../components/ListingScroller';
import SubmissionListingContext from '../context/SubmissionListingContext';
import useSubmissionListing from '../hooks/useSubmissionListing';
import useSubreddit from '../hooks/useSubreddit';
import ScreenProps from '../types/ScreenProps';

export type SubredditScreenProps = NativeStackScreenProps<
  ScreenProps,
  'SubredditScreen'
>;

const SubredditScreen = ({
  route: {
    params: { subreddit },
  },
}: SubredditScreenProps) => {
  const navigation = useNavigation();

  const subName =
    typeof subreddit === 'string' ? subreddit : subreddit.display_name;

  const { listing, refresh, refreshing, fetchMore, sort, setSort } =
    useSubmissionListing({
      subredditName: subName,
      options: { limit: 25 },
    });

  const { sub, loading } = useSubreddit(subreddit);

  const renderHeader = () => {
    return sub ? (
      <SubredditHeader subreddit={sub} sort={sort} setSortType={setSort} />
    ) : null;
  };

  const onItemPress = (index: number) => {
    navigation.push('PostSwiper', {
      index: index,
      submissions: listing,
      fetchMore: fetchMore,
    });
  };

  return (
    <SubmissionListingContext.Provider
      value={{
        refresh: refresh,
        refreshing: refreshing,
        subredditName: subName,
      }}>
      {loading ? (
        <View marginT-200>
          <LoaderScreen />
        </View>
      ) : (
        <View flex>
          <ListingScroller
            content={listing}
            header={renderHeader}
            onEndReached={fetchMore}
            onItemPress={onItemPress}
          />
        </View>
      )}
    </SubmissionListingContext.Provider>
  );
};

export default SubredditScreen;
