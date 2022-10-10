import { Button, Text, View } from 'react-native-ui-lib';
import { Submission } from 'snoowrap';

interface SubmissionActionBarProps {
  submission: Submission;
}

const SubmissionActionBar = ({ submission }: SubmissionActionBarProps) => {
  return (
    <View row padding-10 spread>
      <Text>uppp</Text>
      <Text>down</Text>
      <Text>save</Text>
      <Text>coms</Text>
      <Text>uhhh</Text>
    </View>
  );
};

export default SubmissionActionBar;
