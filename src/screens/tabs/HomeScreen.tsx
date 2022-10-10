import React from 'react';
import { View } from 'react-native-ui-lib';
import ListingScroller from '../../components/ListingScroller';
import useSubmissionListing from '../../hooks/useSubmissionListing';

const HomeScreen = () => {
  const { listing } = useSubmissionListing('Front Page', {});

  return (
    <View flex>
      <ListingScroller content={listing} />
    </View>
  );
};

export default HomeScreen;
