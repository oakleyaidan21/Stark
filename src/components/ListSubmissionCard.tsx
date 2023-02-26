import { TouchableNativeFeedback } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import ContentActionBar from './ContentActionBar';
import SubmissionInfo from './SubmissionInfo';

type ListSubmissionCardProps = {
  submission: Submission;
  onPress: any;
  index?: number;
};

const ListSubmissionCard = ({
  submission,
  onPress,
  index,
}: ListSubmissionCardProps) => {
  return (
    <TouchableNativeFeedback onPress={() => onPress(index)}>
      <View bg-bgColor>
        <SubmissionInfo submission={submission} />
        <ContentActionBar content={submission} />
      </View>
    </TouchableNativeFeedback>
  );
};

export default ListSubmissionCard;
