import { useContext, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SubmissionListingContext from '../../context/SubmissionListingContext';
import SubList from '../SubList';

const HomeHeader = () => {
  const { subredditName } = useContext(SubmissionListingContext);
  const [showSubList, setShowSubList] = useState(false);

  return (
    <View flex center spread row paddingH-10 paddingV-5 bg-bgColor>
      <View width={50}>
        <Icon name="menu" color={'lightgrey'} size={20} />
      </View>
      <TouchableWithoutFeedback onPress={() => setShowSubList(true)}>
        <View flex-2>
          <Text bold>{subredditName}</Text>
          <Text color={Colors.tertiaryText}>Filter</Text>
        </View>
      </TouchableWithoutFeedback>
      <View row flex spread>
        <Icon name="magnify" color={'lightgrey'} size={20} />
        <Icon name="filter-variant" color={'lightgrey'} size={20} />
        <Icon name="dots-vertical" color={'lightgrey'} size={20} />
      </View>

      <SubList visible={showSubList} setVisible={setShowSubList} />
    </View>
  );
};

export default HomeHeader;
