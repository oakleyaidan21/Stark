import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import SubredditRow from '../../components/SubredditRow';
import useSearchSubreddits from '../../hooks/useSearchSubreddits';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenProps from '../../types/ScreenProps';
import useSnoowrap from '../../hooks/useSnoowrap';

const SearchScreen = ({ route, navigation }: any) => {
  const searchString = route.params?.searchString;

  const { results } = useSearchSubreddits(searchString);

  const renderItem = ({ item }: ListRenderItemInfo<Subreddit>) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SubredditScreen', { subreddit: item })
        }>
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

const iconSize = 38;
const SearchListHeader = ({ searchString }: SearchListHeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  return (
    <View>
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate('SearchResultScreen', { query: searchString })
        }>
        <View row centerV marginV-10>
          <View
            backgroundColor="gray"
            center
            marginR-5
            style={{
              borderRadius: iconSize / 2,
              width: iconSize,
              height: iconSize,
            }}>
            <Icon name={'magnify'} size={25} color={Colors.white} />
          </View>
          <Text>
            Search posts with <Text bold>{searchString}</Text>
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate('UserScreen', { name: searchString })
        }>
        <View row centerV>
          <View
            backgroundColor="gray"
            center
            marginR-5
            marginB-5
            style={{
              borderRadius: iconSize / 2,
              width: iconSize,
              height: iconSize,
            }}>
            <Icon name={'account'} size={25} color={Colors.white} />
          </View>
          <Text>
            Go to user <Text bold>{searchString}</Text>
          </Text>
        </View>
      </TouchableNativeFeedback>
      <Text bold marginB-10>
        Subreddits
      </Text>
    </View>
  );
};

export default SearchScreen;
