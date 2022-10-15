import React from 'react';
import { View } from 'react-native-ui-lib';
import ListingScroller from '../../components/ListingScroller';
import HomeHeader from '../../components/tabHeaders/HomeHeader';
import SubmissionListingContext from '../../context/SubmissionListingContext';
import useSubmissionListing from '../../hooks/useSubmissionListing';

const HomeScreen = () => {
  const { listing, refresh, refreshing, subredditName } = useSubmissionListing({
    subName: 'Front Page',
    options: { limit: 25 },
  });

  return (
    <SubmissionListingContext.Provider
      value={{
        refresh: refresh,
        refreshing: refreshing,
        subredditName: subredditName,
      }}>
      <View flex>
        <ListingScroller content={listing} header={HomeHeader} />
      </View>
    </SubmissionListingContext.Provider>
  );
};

export default HomeScreen;
