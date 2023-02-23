import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';
import SearchResultHeader from '../components/headers/SearchResultHeader';
import ListingScroller from '../components/ListingScroller';
import SubmissionListingContext from '../context/SubmissionListingContext';
import useSearchPosts from '../hooks/useSearchPosts';
import ScreenProps from '../types/ScreenProps';

const SearchResultScreen = ({
  navigation,
  route: {
    params: { query },
  },
}: NativeStackScreenProps<ScreenProps, 'SearchResultScreen'>) => {
  const { loading, results, fetchMore, refresh, refreshing } =
    useSearchPosts(query);

  const onItemPress = (index: number) => {
    if (results) {
      navigation.push('PostSwiper', {
        index: index,
        submissions: results,
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
        }}>
        <View flex>
          {loading ? (
            <ActivityIndicator color={Colors.oBgColor} />
          ) : (
            <ListingScroller
              content={results}
              header={() => <SearchResultHeader query={query} />}
              onEndReached={fetchMore}
              onItemPress={onItemPress}
            />
          )}
        </View>
      </SubmissionListingContext.Provider>
    </View>
  );
};

export default SearchResultScreen;
