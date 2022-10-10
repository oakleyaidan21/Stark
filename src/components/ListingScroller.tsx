import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Listing, Submission } from 'snoowrap';
import SubmissionListCard from './SubmissionListCard';

interface ListingScrollerProps {
  content?: Listing<any>;
}

const ListingScroller = ({ content }: ListingScrollerProps) => {
  const navigation = useNavigation();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Submission>) => {
    return (
      <SubmissionListCard
        submission={item}
        onPress={() =>
          (navigation as any).navigate('Submission', { submission: item })
        }
      />
    );
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
