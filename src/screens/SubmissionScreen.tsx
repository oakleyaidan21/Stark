import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoaderScreen, View } from 'react-native-ui-lib';
import FullSubmission from '../components/FullSubmission';
import useSubmission from '../hooks/useSubmission';
import ScreenProps from '../types/ScreenProps';

const SubmissionScreen = ({
  route: {
    params: { submission, id },
  },
}: NativeStackScreenProps<ScreenProps, 'Submission'>) => {
  const { fullSubmission } = useSubmission(submission, id);

  return fullSubmission ? (
    <FullSubmission submission={fullSubmission} />
  ) : (
    <View marginT-200>
      <LoaderScreen />
    </View>
  );
};

export default SubmissionScreen;
