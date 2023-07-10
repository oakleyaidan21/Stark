import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenProps from '../types/ScreenProps';
import { Colors, Text, View } from 'react-native-ui-lib';
import { isSubmission } from '../util/RedditUtil';
import SubmissionInfo from '../components/SubmissionInfo';
import CommentCard from '../components/CommentCard';
import { Alert, ScrollView, TextInput } from 'react-native';
import useCurrentUser from '../hooks/useCurrentUser';
import UserRow from '../components/UserRow';
import useSnoowrap from '../hooks/useSnoowrap';
import { useState } from 'react';

export type CreateCommentScreenProps = NativeStackScreenProps<
  ScreenProps,
  'CreateCommentScreen'
>;

const CreateCommentScreen = ({
  route: {
    params: { content },
  },
  navigation,
}: CreateCommentScreenProps) => {
  const isASubmission = isSubmission(content);
  const { currentUser } = useCurrentUser();
  const [comment, setComment] = useState<string>('');

  const submitComment = () => {
    content
      .reply(comment)
      .then(() => navigation.goBack())
      .catch(e => Alert.alert('Error submitting comment', e.message));
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View bg-bgColor>
        {isASubmission ? (
          <SubmissionInfo submission={content} />
        ) : (
          <CommentCard comment={content} disableExpand />
        )}
      </View>
      <View paddingH-10 paddingT-5>
        {currentUser && <UserRow user={currentUser} />}
        <TextInput
          multiline
          returnKeyType="send"
          placeholderTextColor={Colors.tertiaryText}
          style={{ color: Colors.oBgColor, flex: 1 }}
          placeholder="Type a comment"
          value={comment}
          onChangeText={setComment}
          onSubmitEditing={submitComment}
        />
      </View>
    </ScrollView>
  );
};

export default CreateCommentScreen;
