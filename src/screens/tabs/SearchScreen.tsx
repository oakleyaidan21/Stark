import React from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import SubredditRow from '../../components/SubredditRow';
import useSearchSubreddits from '../../hooks/useSearchSubreddits';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchScreen = ({ route }: any) => {
  const searchString = route.params?.searchString;

  const { results } = useSearchSubreddits(searchString);

  const renderItem = ({ item }: ListRenderItemInfo<Subreddit>) => {
    return (
      <TouchableOpacity onPress={() => console.log('yeet!')}>
        <SubredditRow subreddit={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View flex paddingH-10>
      {searchString && (
        <FlatList
          data={results}
          renderItem={renderItem}
          style={{ flex: 1 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={() => (
            <SearchListHeader searchString={searchString} />
          )}
        />
      )}
    </View>
  );
};

export interface SearchListHeaderProps {
  searchString: string;
}

const SearchListHeader = ({ searchString }: SearchListHeaderProps) => {
  return (
    <View>
      <View row centerV marginV-10>
        <View
          backgroundColor="gray"
          center
          marginR-5
          style={{ borderRadius: 15, width: 30, height: 30 }}>
          <Icon name={'magnify'} size={25} color={Colors.white} />
        </View>
        <Text>
          Search posts with <Text bold>{searchString}</Text>
        </Text>
      </View>
      <View row centerV marginB-10>
        <View
          backgroundColor="gray"
          center
          marginR-5
          style={{ borderRadius: 15, width: 30, height: 30 }}>
          <Icon name={'magnify'} size={25} color={Colors.white} />
        </View>
        <Text>
          Search subreddits with <Text bold>{searchString}</Text>
        </Text>
      </View>
      <Text bold marginB-10>
        Subreddits
      </Text>
    </View>
  );
};

export default SearchScreen;
