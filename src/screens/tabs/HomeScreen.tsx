import React, { useState } from 'react';
import { View } from 'react-native-ui-lib';
import ListingScroller from '../../components/ListingScroller';
import HomeHeader from '../../components/headers/tabHeaders/HomeHeader';
import SubmissionListingContext from '../../context/SubmissionListingContext';
import useSubmissionListing from '../../hooks/useSubmissionListing';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [subredditName, setSubredditName] = useState('Front Page');

  const navigation = useNavigation();

  const { listing, refresh, refreshing, fetchMore, sort, setSort, errored } =
    useSubmissionListing({
      subredditName: subredditName,
      options: { limit: 25 },
    });

  const renderHeader = () => {
    return <HomeHeader sort={sort} setSort={setSort} />;
  };

  const onItemPress = (index: number) => {
    console.log('index!!!', index);
    navigation.navigate('PostSwiper', {
      index: index,
      submissions: listing,
      fetchMore: fetchMore,
    });
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
