import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Listing } from 'snoowrap';
import SubmissionListCard from './SubmissionListCard';

interface ListingScrollerProps {
  content?: Listing<any>;
}

const ListingScroller = ({ content }: ListingScrollerProps) => {
  const renderItem = useCallback(({ item }) => {
    return <SubmissionListCard submission={item} />;
  }, []);

  return content ? (
    <FlatList
      data={content}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id + index.toString()}
    />
  ) : (
    <View flex center>
      <Text bold>Error loading content</Text>
    </View>
  );
};

export default ListingScroller;
