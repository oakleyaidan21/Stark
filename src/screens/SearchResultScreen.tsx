import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';
import ListingScroller from '../components/ListingScroller';
import SubmissionListingContext from '../context/SubmissionListingContext';
import useSearchPosts from '../hooks/useSearchPosts';
import ScreenProps from '../types/ScreenProps';

const SearchResultScreen = ({
  route: {
    params: { query },
  },
}: NativeStackScreenProps<ScreenProps, 'SearchResultScreen'>) => {
  const { loading, results, search, getMore } = useSearchPosts(query);

  return (
    <View flex>
      <SubmissionListingContext.Provider
        value={{
          refresh: search,
          refreshing: loading,
        }}>
        <View flex>
          {loading ? (
            <ActivityIndicator color={Colors.oBgColor} />
          ) : (
            <ListingScroller
              content={results}
              header={null}
              onEndReached={getMore}
            />
          )}
        </View>
      </SubmissionListingContext.Provider>
    </View>
  );
};

export default SearchResultScreen;
