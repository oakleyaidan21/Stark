import React, { useState } from 'react';
import { View } from 'react-native-ui-lib';
import ListingScroller from '../../components/ListingScroller';
import HomeHeader from '../../components/headers/tabHeaders/HomeHeader';
import SubmissionListingContext from '../../context/SubmissionListingContext';
import useSubmissionListing from '../../hooks/useSubmissionListing';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenProps from '../../types/ScreenProps';

const HomeScreen = () => {
  const [subredditName, setSubredditName] = useState('Front Page');

  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const {
    listing,
    refresh,
    refreshing,
    fetchMore,
    sort,
    setSort,
    timeSort,
    setTimeSort,
    errored,
  } = useSubmissionListing({
    subredditName: subredditName,
    options: { limit: 25 },
  });

  const renderHeader = () => {
    return (
      <HomeHeader
        sort={sort}
        setSort={setSort}
        timeSort={timeSort}
        setTimeSort={type => {
          setSort('Top');
          setTimeSort(type);
        }}
      />
    );
  };

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
    <SubmissionListingContext.Provider
      value={{
        refresh: refresh,
        listing: listing,
        refreshing: refreshing,
        subredditName: subredditName,
        changeSubreddit: setSubredditName,
        errored: errored,
      }}>
      <View flex>
        <ListingScroller
          header={renderHeader}
          onEndReached={fetchMore}
          onItemPress={onItemPress}
        />
      </View>
    </SubmissionListingContext.Provider>
  );
};

export default HomeScreen;
