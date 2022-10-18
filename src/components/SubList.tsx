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

const SubList = ({ visible, setVisible }: SubListProps) => {
  const { changeSubreddit } = useContext(SubmissionListingContext);

  const { userSubs } = useContext(StarkContext);

  const onSubPress = (sub: Subreddit) => {
    if (changeSubreddit) {
      changeSubreddit(sub.display_name);
      setVisible(false);
    }
  };

  const options = userSubs?.map(sub => ({
    label: sub.display_name,
    onPress: () => onSubPress(sub),
  }));

  const _renderAction = (
    { label }: ButtonProps,
    index: number,
    onOptionPress: any,
  ) => {
    return userSubs ? (
      <SubredditActionRow
        sub={userSubs[index]}
        onPress={() => onOptionPress(index)}
        key={label}
      />
    ) : null;
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
  sub: Subreddit;
  onPress: any;
}

const SubredditActionRow = ({ sub, onPress }: SubredditActionRowProps) => {
  const url = useGetSubredditIcon(sub);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View centerV height={40} paddingL-10>
        <View row centerV>
          <View
            width={30}
            height={30}
            center
            marginR-10
            style={{ borderRadius: 5 }}
            backgroundColor={'grey'}>
            <Image
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={{ uri: url }}
            />
          </View>
          <Text>{sub.display_name}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SubList;
