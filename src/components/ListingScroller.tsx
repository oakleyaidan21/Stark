import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, ViewToken } from 'react-native';
import { View, LoaderScreen } from 'react-native-ui-lib';
import { Listing, Submission } from 'snoowrap';
import ListSubmissionCard from './ListSubmissionCard';
import SeparatorComponent from './SeparatorComponent';

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
}

const ListingScroller = ({
  content,
  header,
  onEndReached,
}: ListingScrollerProps) => {
  const [viewableItems, setViewableItems] = useState<(number | null)[]>([]);

  const navigation = useNavigation();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Submission>) => {
      const inView = viewableItems.includes(index);

      return (
        <ListSubmissionCard
          submission={item}
          inView={inView}
          navigation={navigation}
        />
      );
    },
    [viewableItems],
  );

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const items = info.viewableItems.map(token => token.index);
      setViewableItems(items);
    },
    [setViewableItems],
  );

  return (
    <View flex center>
      <FlatList
        data={content}
        style={{ flex: 1, width: '100%' }}
        ListEmptyComponent={
          <View marginT-200>
            <LoaderScreen />
          </View>
        }
        renderItem={renderItem}
        ListHeaderComponent={header}
        stickyHeaderHiddenOnScroll
        removeClippedSubviews
        stickyHeaderIndices={[0]}
        maxToRenderPerBatch={7}
        windowSize={18}
        ItemSeparatorComponent={SeparatorComponent}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(item, index) => item.id + index.toString()}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default ListingScroller;
