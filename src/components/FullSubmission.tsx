import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  TouchableNativeFeedback,
} from 'react-native';
import { Colors, LoaderScreen, Text, View } from 'react-native-ui-lib';
import { Comment, Submission } from 'snoowrap';
import useSubmissionComments from '../hooks/useSubmissionComments';
import ScreenProps from '../types/ScreenProps';
import { onLinkPress } from '../util/RedditUtil';
import CommentCard from './CommentCard';
import SeparatorComponent from './SeparatorComponent';
import SubmissionCard from './SubmissionCard';

export interface FullSubmissionProps {
  submission: Submission;
}

const FullSubmission = ({ submission }: FullSubmissionProps) => {
  const { comments, fetchMore, loading } = useSubmissionComments(submission);

  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const _renderHeader = useCallback(() => {
    return <SubmissionCard submission={submission} />;
  }, [submission.id]);

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
        ListHeaderComponentStyle={{ marginBottom: 10 }}
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
