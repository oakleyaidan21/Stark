import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FullSubmission from '../components/FullSubmission';
import ScreenProps from '../types/ScreenProps';

const SubmissionScreen = ({
  route: {
    params: { submission },
  },
}: NativeStackScreenProps<ScreenProps, 'Submission'>) => {
  return <FullSubmission submission={submission} />;
};

export default SubmissionScreen;
