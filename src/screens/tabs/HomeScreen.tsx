import React, { useState } from 'react';
import { View } from 'react-native-ui-lib';
import ListingScroller from '../../components/ListingScroller';
import HomeHeader from '../../components/headers/tabHeaders/HomeHeader';
import SubmissionListingContext from '../../context/SubmissionListingContext';
import useSubmissionListing from '../../hooks/useSubmissionListing';

const HomeScreen = () => {
  const [subredditName, setSubredditName] = useState('Front Page');

  const { listing, refresh, refreshing, fetchMore } = useSubmissionListing({
    subredditName: subredditName,
    options: { limit: 25 },
  });

  return (
    <SubmissionListingContext.Provider
      value={{
        refresh: refresh,
        refreshing: refreshing,
        subredditName: subredditName,
        changeSubreddit: setSubredditName,
      }}>
      <View flex>
        <ListingScroller
          content={listing}
          header={HomeHeader}
          onEndReached={fetchMore}
        />
      </View>
    </SubmissionListingContext.Provider>
  );
};

export default HomeScreen;
