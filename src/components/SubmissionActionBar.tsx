import { View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SubmissionActionBarProps {
  submission: Submission;
}

const SubmissionActionBar = ({ submission }: SubmissionActionBarProps) => {
  return (
    <View row height={40} paddingH-10 spread centerV>
      <Icon name="arrow-up-bold-outline" size={23} color={'grey'} />
      <Icon name="arrow-down-bold-outline" size={23} color={'grey'} />
      <Icon name="star-outline" size={23} color={'grey'} />
      <Icon name="comment-text-outline" size={23} color={'grey'} />
      <Icon name="exit-to-app" size={23} color={'grey'} />
      <Icon name="dots-vertical" size={23} color={'grey'} />
    </View>
  );
};

export default SubmissionActionBar;
