import { useCallback, useContext } from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import {
  Colors,
  Dialog,
  PanningProvider,
  Text,
  View,
} from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import StarkContext from '../context/StarkContext';
import SubmissionListingContext from '../context/SubmissionListingContext';
import SubredditRow from './SubredditRow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface SubListProps {
  visible: boolean;
  setVisible: any;
}

const defaults = [
  { name: 'All', icon: 'all-inclusive-box' },
  { name: 'Front Page', icon: 'newspaper' },
  { name: 'Saved', icon: 'star' },
];

export interface SubDialogProps {
  visible: boolean;
  setVisible: any;
}

const SubDialog = ({ visible, setVisible }: SubDialogProps) => {
  const { userSubs } = useContext(StarkContext);
  const { changeSubreddit } = useContext(SubmissionListingContext);

  const onSubPress = (sub: Subreddit | string) => {
    if (changeSubreddit) {
      if (typeof sub === 'string') {
        changeSubreddit(sub);
      } else {
        changeSubreddit(sub.display_name);
      }
      setVisible(false);
    }
  };

  const _renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Subreddit>) => (
      <TouchableOpacity onPress={() => onSubPress(item)}>
        <SubredditRow subreddit={item} />
      </TouchableOpacity>
    ),
    [onSubPress],
  );

  const _renderSeperator = useCallback(() => <View height={5} />, []);

  const _renderHeader = useCallback(() => {
    return (
      <View row centerV padding-5 spread bg-bgColor>
        {defaults.map(sub => {
          return (
            <TouchableOpacity
              key={sub.name}
              onPress={() => onSubPress(sub.name)}>
              <View
                padding-5
                row
                centerV
                bg-primary
                style={{ borderRadius: 5 }}>
                <Icon name={sub.icon} color={Colors.white} size={23} />
                <Text bold style={{ color: Colors.white }}>
                  {sub.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [onSubPress]);

  return (
    <Dialog
      visible={visible}
      onDismiss={() => setVisible(false)}
      width="100%"
      height="70%"
      direction={PanningProvider.Directions.DOWN}
      bottom>
      <View flex bg-bgColor>
        <FlatList
          keyExtractor={item => item.display_name}
          data={userSubs}
          ListHeaderComponent={_renderHeader}
          renderItem={_renderItem}
          style={{ flex: 1 }}
          ItemSeparatorComponent={_renderSeperator}
          stickyHeaderIndices={[0]}
        />
      </View>
    </Dialog>
  );
};

const SubList = ({ visible, setVisible }: SubListProps) => {
  return <SubDialog visible={visible} setVisible={setVisible} />;
};

export default SubList;
