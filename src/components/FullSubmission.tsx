import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { LoaderScreen, Text, View } from 'react-native-ui-lib';
import { Comment, Submission } from 'snoowrap';
import useSubmissionComments from '../hooks/useSubmissionComments';
import SubmissionListCard from './SubmissionListCard';

export interface FullSubmissionProps {
  submission: Submission;
}

const FullSubmission = ({ submission }: FullSubmissionProps) => {
  const { comments } = useSubmissionComments(submission);

  const _renderHeader = () =>
    useCallback(
      () => (
        <SubmissionListCard submission={submission} inView onPress={() => {}} />
      ),
      [],
    );

  const _renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Comment>) => <Text>{item.body}</Text>,
    [],
  );

  return (
    <View flex>
      <FlatList
        data={comments}
        style={{ flex: 1 }}
        ListHeaderComponent={_renderHeader()}
        renderItem={_renderItem}
        ListEmptyComponent={<LoaderScreen style={{ height: 200 }} />}
      />
    </View>
  );
};

export default FullSubmission;
