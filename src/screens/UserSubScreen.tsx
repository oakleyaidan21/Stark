import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import { Listing, Subreddit } from 'snoowrap';
import SeparatorComponent from '../components/SeparatorComponent';
import SubredditRow from '../components/SubredditRow';
import StarkContext from '../context/StarkContext';
import useSearchSubreddits from '../hooks/useSearchSubreddits';
import ScreenProps from '../types/ScreenProps';
import React from 'react';

const defaults = [
  { name: 'All', icon: 'all-inclusive-box' },
  { name: 'Front Page', icon: 'newspaper' },
  { name: 'Saved', icon: 'star' },
];

export type UserSubScreenProps = NativeStackScreenProps<
  ScreenProps,
  'UserSubScreen'
>;

const UserSubScreen = ({
  route: {
    params: { changeSubreddit, searchString },
  },
  navigation,
}: UserSubScreenProps) => {
  const { userSubs } = useContext(StarkContext);

  const [subs, setSubs] = useState<
    Listing<Subreddit> | Subreddit[] | undefined
  >(userSubs);

  const { results, loading } = useSearchSubreddits(searchString ?? '');

  useEffect(() => {
    if (searchString !== undefined && userSubs) {
      if (searchString === '') {
        setSubs(userSubs);
      } else {
        const filteredSubs = userSubs.filter(sub =>
          sub.display_name.toLowerCase().includes(searchString.toLowerCase()),
        );
        setSubs(filteredSubs);
      }
    }
  }, [searchString]);

  useEffect(() => {
    setSubs(userSubs);
  }, [userSubs]);

  const dismiss = () => navigation.goBack();

  const onSubPress = (sub: Subreddit | string) => {
    if (changeSubreddit) {
      if (typeof sub === 'string') {
        changeSubreddit(sub);
      } else {
        changeSubreddit(sub.display_name);
      }
      dismiss();
    }
  };

  const _renderHeader = () => {
    return (
      <View>
        {defaults.map(({ name, icon }) => {
          return (
            <>
              <TouchableOpacity onPress={() => onSubPress(name)}>
                <SubredditRow subreddit={name} iconName={icon} />
              </TouchableOpacity>
              {_renderSeperator()}
            </>
          );
        })}
      </View>
    );
  };

  const _renderSeperator = useCallback(() => <SeparatorComponent />, []);

  const _renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Subreddit>) => (
      <TouchableOpacity onPress={() => onSubPress(item)}>
        <SubredditRow subreddit={item} />
      </TouchableOpacity>
    ),
    [onSubPress],
  );

  return (
    <View flex>
      <FlatList
        data={results ? subs?.concat(results) : subs}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        style={{ marginTop: 5 }}
        renderItem={_renderItem}
        ListHeaderComponent={_renderHeader}
        ListFooterComponent={loading ? <ActivityIndicator /> : <></>}
        ItemSeparatorComponent={_renderSeperator}
        keyExtractor={item => item.display_name}
      />
    </View>
  );
};

export default UserSubScreen;
