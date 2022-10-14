import { Button, Colors, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SubmissionActionBarProps {
  submission: Submission;
}

const SubmissionActionBar = ({ submission }: SubmissionActionBarProps) => {
  return (
    <View row padding-10 spread>
      <Icon name="arrow-up" size={25} color={'grey'} />
      <Icon name="arrow-down" size={25} color={'grey'} />
      <Icon name="star" size={25} color={'grey'} />
      <Icon name="dots-vertical" size={25} color={'grey'} />
    </View>
  );
};

export default SubmissionActionBar;
