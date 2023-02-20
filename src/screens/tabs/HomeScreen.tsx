import React, { useState } from 'react';
import { View } from 'react-native-ui-lib';
import ListingScroller from '../../components/ListingScroller';
import HomeHeader from '../../components/headers/tabHeaders/HomeHeader';
import SubmissionListingContext from '../../context/SubmissionListingContext';
import useSubmissionListing from '../../hooks/useSubmissionListing';

const HomeScreen = () => {
  const [subredditName, setSubredditName] = useState('Front Page');

  const { listing, refresh, refreshing, fetchMore, sort, setSort } =
    useSubmissionListing({
      subredditName: subredditName,
      options: { limit: 25 },
    });

  const renderHeader = () => {
    return <HomeHeader sort={sort} setSort={setSort} />;
  };

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
          header={renderHeader}
          onEndReached={fetchMore}
        />
      </View>
    </SubmissionListingContext.Provider>
  );
};

export default HomeScreen;
