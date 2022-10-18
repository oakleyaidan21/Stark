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

  const getLeftIcon = (index: number) => {
    const icon_url = userSubs
      ? index < userSubs.length
        ? userSubs[index].icon_img
        : ''
      : '';
    // switch (label) {
    //   case 'All':
    //     return <Icon name="incognito" size={25} color={Colors.textColor} />;
    //   case 'Front Page':
    //     return <Icon name="plus" size={25} color={Colors.textColor} />;
    //   default:
    //     return label ? (
    //       <Image
    // style={{ width: '100%', height: '100%', borderRadius: 5 }}
    // source={{ uri:  }}
    //       />
    //     ) : (
    //       <></>
    //     );
    // }
    return (
      <Image
        style={{ width: '100%', height: '100%', borderRadius: 5 }}
        source={{ uri: icon_url }}
      />
    );
  };

  const _renderAction = (
    { label }: ButtonProps,
    index: number,
    onOptionPress: any,
  ) => {
    return (
      <TouchableNativeFeedback onPress={() => onOptionPress(index)} key={label}>
        <View centerV height={40} paddingL-10>
          <View row centerV>
            <View
              width={30}
              height={30}
              center
              marginR-10
              style={{ borderRadius: 5 }}
              backgroundColor={'grey'}>
              {getLeftIcon(index)}
            </View>
            <Text>{label}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
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

export default SubList;
