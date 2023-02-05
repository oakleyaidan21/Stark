import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { LoaderScreen, Text, View } from 'react-native-ui-lib';
import { Comment, Submission } from 'snoowrap';
import useSubmissionComments from '../hooks/useSubmissionComments';
import CommentCard from './CommentCard';
import SeparatorComponent from './SeparatorComponent';
import SubmissionCard from './SubmissionCard';

export interface FullSubmissionProps {
  submission: Submission;
}

const FullSubmission = ({ submission }: FullSubmissionProps) => {
  const { comments } = useSubmissionComments(submission);

  const _renderHeader = () =>
    useCallback(
      () => <SubmissionCard submission={submission} inView showBody />,
      [],
    );

  const _renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Comment>) => <CommentCard comment={item} />,
    [],
  );

  return (
    <View flex>
      <FlatList
        data={comments}
        ItemSeparatorComponent={SeparatorComponent}
        style={{ flex: 1 }}
        ListHeaderComponent={_renderHeader()}
        renderItem={_renderItem}
        ListEmptyComponent={<LoaderScreen style={{ height: 200 }} />}
      />
    </View>
  );
};

export default FullSubmission;
