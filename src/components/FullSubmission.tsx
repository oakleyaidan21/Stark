import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  TouchableNativeFeedback,
} from 'react-native';
import { Colors, LoaderScreen, Text, View } from 'react-native-ui-lib';
import { Comment, Submission } from 'snoowrap';
import useSubmissionComments from '../hooks/useSubmissionComments';
import { onLinkPress } from '../util/RedditUtil';
import CommentCard from './CommentCard';
import SeparatorComponent from './SeparatorComponent';
import SubmissionCard from './SubmissionCard';

export interface FullSubmissionProps {
  submission: Submission;
  visible?: boolean;
}

const FullSubmission = ({ submission, visible }: FullSubmissionProps) => {
  const { comments, fetchMore, loading } = useSubmissionComments(submission);

  const navigation = useNavigation();

  const _renderHeader = useCallback(() => {
    return (
      <SubmissionCard
        submission={submission}
        inView={visible === undefined || visible}
      />
    );
  }, [visible]);

  const openLink = useCallback((url: string) => {
    onLinkPress(url, navigation);
  }, []);

  const _renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Comment>) => (
      <CommentCard comment={item} onLinkPress={openLink} />
    ),
    [],
  );

  const _renderListEmpty = useCallback(() => {
    if (!loading) {
      return (
        <View paddingT-50 center>
          <Text style={{ color: Colors.tertiaryText }}>No comments</Text>
        </View>
      );
    }
    return <LoaderScreen style={{ height: 200 }} />;
  }, [loading]);

  const _renderFooter = useCallback(() => {
    return !comments?.isFinished && !loading ? (
      <View marginV-20 center>
        <TouchableNativeFeedback onPress={fetchMore}>
          <Text bold style={{ color: Colors.tertiaryText }}>
            Get more comments
          </Text>
        </TouchableNativeFeedback>
      </View>
    ) : null;
  }, [comments]);

  return (
    <View flex>
      <FlatList
        data={comments}
        ItemSeparatorComponent={SeparatorComponent}
        style={{ flex: 1 }}
        ListHeaderComponent={_renderHeader}
        renderItem={_renderItem}
        ListFooterComponent={_renderFooter}
        ListEmptyComponent={_renderListEmpty}
      />
    </View>
  );
};

export default FullSubmission;
