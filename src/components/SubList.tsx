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
  const url = useGetSubredditIcon(sub);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View centerV height={40} paddingL-10>
        <View row centerV>
          <View width={30} height={30} center marginR-10>
            <Image
              style={{ width: '100%', height: '100%', borderRadius: 30 }}
              source={{ uri: url }}
            />
          </View>
          <Text>{sub}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SubList;
