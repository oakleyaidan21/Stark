import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeHeader = () => {
  return (
    <View flex center spread row paddingH-10 paddingV-5>
      <View width={50}>
        <Icon name="menu" color={'lightgrey'} size={20} />
      </View>
      <View flex-2>
        <Text bold>Subreddit Name</Text>
        <Text color={Colors.tertiaryText}>Filter</Text>
      </View>
      <View row flex spread>
        <Icon name="magnify" color={'lightgrey'} size={20} />
        <Icon name="filter-variant" color={'lightgrey'} size={20} />
        <Icon name="dots-vertical" color={'lightgrey'} size={20} />
      </View>
    </View>
  );
};

export default HomeHeader;
