import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import FullSubmission from '../components/FullSubmission';
import ScreenProps from '../types/ScreenProps';

const SubmissionScreen = ({
  route: {
    params: { submission },
  },
}: NativeStackScreenProps<ScreenProps, 'Submission'>) => {
  const renderListHeaderComponent = useCallback(() => {
    return <FullSubmission submission={submission} />;
  }, []);

  return (
    <FlatList
      ListHeaderComponent={renderListHeaderComponent}
      data={[]}
      renderItem={() => <></>}
    />
  );
};

export default SubmissionScreen;
