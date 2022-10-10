import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native-ui-lib';
import ScreenProps from '../types/ScreenProps';

const SubmissionScreen = ({
  route: {
    params: { submission },
  },
}: NativeStackScreenProps<ScreenProps, 'Submission'>) => {
  return (
    <View flex>
      <Text>{submission.title}</Text>
    </View>
  );
};

export default SubmissionScreen;
