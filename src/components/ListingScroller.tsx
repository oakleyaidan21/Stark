import { FlatList } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Listing } from 'snoowrap';

interface ListingScrollerProps {
  content?: Listing<any>;
}

const ListingScroller = ({ content }: ListingScrollerProps) =>
  content ? (
    <FlatList
      data={content}
      renderItem={({ item }) => {
        return <Text>{item.title}</Text>;
      }}
    />
  ) : (
    <View flex center>
      <Text bold>Error loading content</Text>
    </View>
  );

export default ListingScroller;
