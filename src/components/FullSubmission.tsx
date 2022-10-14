import { View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';
import SubmissionListCard from './SubmissionListCard';

export interface FullSubmissionProps {
  submission: Submission;
}

const FullSubmission = ({ submission }: FullSubmissionProps) => {
  return (
    <View flex>
      <SubmissionListCard submission={submission} inView onPress={() => {}} />
    </View>
  );
};

export default FullSubmission;
