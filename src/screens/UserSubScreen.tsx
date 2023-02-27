import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useContext } from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import SubredditRow from '../components/SubredditRow';
import StarkContext from '../context/StarkContext';
import ScreenProps from '../types/ScreenProps';

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
    params: { changeSubreddit },
  },
  navigation,
}: UserSubScreenProps) => {
  const { userSubs } = useContext(StarkContext);

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

  const _renderSeperator = useCallback(() => <View height={5} />, []);

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
        data={userSubs}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        renderItem={_renderItem}
        ListHeaderComponent={_renderHeader}
        ItemSeparatorComponent={_renderSeperator}
        keyExtractor={item => item.display_name}
      />
    </View>
  );
};

export default UserSubScreen;
