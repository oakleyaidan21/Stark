import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, ViewToken } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Listing, Submission } from 'snoowrap';
import SubmissionListCard from './SubmissionListCard';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

interface ListingScrollerProps {
  content?: Listing<any>;
}

const ListingScroller = ({ content }: ListingScrollerProps) => {
  const [viewableItems, setViewableItems] = useState<(number | null)[]>([]);

  const navigation = useNavigation();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Submission>) => {
      const inView = viewableItems.includes(index);
      return (
        <SubmissionListCard
          submission={item}
          onPress={() =>
            (navigation as any).navigate('Submission', { submission: item })
          }
          inView={inView}
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

  return content ? (
    <FlatList
      data={content}
      renderItem={renderItem}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      keyExtractor={(item, index) => item.id + index.toString()}
    />
  ) : (
    <View flex center>
      <Text bold>Error loading content</Text>
    </View>
  );
};

export default ListingScroller;
