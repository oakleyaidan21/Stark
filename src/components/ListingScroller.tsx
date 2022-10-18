import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  TouchableNativeFeedback,
  ViewToken,
} from 'react-native';
import { View, LoaderScreen } from 'react-native-ui-lib';
import { Listing, Submission } from 'snoowrap';
import SeparatorComponent from './SeparatorComponent';
import SubmissionCard from './SubmissionCard';

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
      const onPress = () => {
        (navigation as any).navigate('Submission', { submission: item });
      };
      return (
        <TouchableNativeFeedback onPress={onPress}>
          <View>
            <SubmissionCard submission={item} inView={inView} inList />
          </View>
        </TouchableNativeFeedback>
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
    <FlatList
      data={content}
      contentContainerStyle={content ? undefined : { flex: 1 }}
      ListEmptyComponent={<LoaderScreen />}
      renderItem={renderItem}
      ListHeaderComponent={header}
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}
      ItemSeparatorComponent={SeparatorComponent}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      keyExtractor={(item, index) => item.id + index.toString()}
      onEndReached={onEndReached}
    />
  );
};

export default ListingScroller;
