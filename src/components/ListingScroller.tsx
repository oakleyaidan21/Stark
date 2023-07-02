import { useCallback, useContext, useState } from 'react';
import { RefreshControl } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, LoaderScreen, Text } from 'react-native-ui-lib';
import { Listing, Submission } from 'snoowrap';
import SubmissionListingContext from '../context/SubmissionListingContext';
import ListSubmissionCard from './ListSubmissionCard';
import SeparatorComponent from './SeparatorComponent';
import { FlashList, ListRenderItem } from '@shopify/flash-list';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

interface ListingScrollerProps {
  content?: Listing<any>;
  onEndReached?: any;
  header:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
  onItemPress: any;
}

const ListingScroller = ({
  content,
  header,
  onEndReached,
  onItemPress,
}: ListingScrollerProps) => {
  const hasHeader = !!header;

  const renderItem = useCallback(
    ({ item, index }: ListRenderItem<any>) => {
      return (
        <ListSubmissionCard
          index={index}
          submission={item}
          onPress={onItemPress}
        />
      );
    },
    [onItemPress],
  );

  const { listing, errored, refresh, refreshing } = useContext(
    SubmissionListingContext,
  );

  const items = content ?? listing;

  return (
    <View flex>
      {errored ? (
        <View flex center>
          <Text bold marginB-10>
            Error getting content {':('}
          </Text>
          <TouchableWithoutFeedback onPress={refresh}>
            <Text bold>Retry</Text>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <FlashList
          refreshControl={
            <RefreshControl refreshing={!!refreshing} onRefresh={refresh} />
          }
          data={items}
          ListEmptyComponent={
            <View marginT-200>
              <LoaderScreen />
            </View>
          }
          renderItem={renderItem}
          ListHeaderComponent={header}
          // stickyHeaderHiddenOnScroll
          removeClippedSubviews
          // stickyHeaderIndices={hasHeader ? [0] : undefined}
          maxToRenderPerBatch={7}
          windowSize={18}
          ItemSeparatorComponent={SeparatorComponent}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(item, index) => item.id + index.toString()}
          onEndReached={onEndReached}
          estimatedItemSize={142}
        />
      )}
    </View>
  );
};

export default ListingScroller;
