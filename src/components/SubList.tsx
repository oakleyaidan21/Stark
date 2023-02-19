import { useContext } from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  ActionSheet,
  ButtonProps,
  Colors,
  Dialog,
  Image,
  Text,
  View,
} from 'react-native-ui-lib';
import { Subreddit } from 'snoowrap';
import StarkContext from '../context/StarkContext';
import SubmissionListingContext from '../context/SubmissionListingContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useGetSubredditIcon from '../hooks/useGetSubredditIcon';
import SubredditRow from './SubredditRow';

export interface SubListProps {
  visible: boolean;
  setVisible: any;
}

const defaults = ['All', 'Front Page', 'Saved'];

const SubList = ({ visible, setVisible }: SubListProps) => {
  const { changeSubreddit } = useContext(SubmissionListingContext);

  const { userSubs } = useContext(StarkContext);

  const allSubs = defaults.concat(
    userSubs ? userSubs.map(sub => sub.display_name) : [],
  );

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

  const options = allSubs.map(sub => ({
    label: sub,
    onPress: () => onSubPress(sub),
  }));

  const _renderAction = (
    { label }: ButtonProps,
    index: number,
    onOptionPress: any,
  ) => {
    return (
      <SubredditActionRow
        sub={allSubs[index]}
        onPress={() => onOptionPress(index)}
        key={label}
      />
    );
  };

  return (
    <ActionSheet
      bg-bgColor
      containerStyle={{ backgroundColor: Colors.bgColor }}
      dialogStyle={{ backgroundColor: Colors.bgColor, paddingBottom: 10 }}
      migrateDialog
      optionsStyle={{ backgroundColor: Colors.bgColor }}
      options={options}
      renderAction={_renderAction}
      visible={visible}
      onDismiss={() => setVisible(false)}
    />
  );
};

export interface SubredditActionRowProps {
  sub: Subreddit | string;
  onPress: any;
}

const SubredditActionRow = ({ sub, onPress }: SubredditActionRowProps) => {
  return (
    <>
      <View style={{ height: 10 }} />
      <TouchableNativeFeedback onPress={onPress}>
        <SubredditRow subreddit={sub} />
      </TouchableNativeFeedback>
    </>
  );
};

export default SubList;
