import { Colors, Text, View } from 'react-native-ui-lib';
import { Comment } from 'snoowrap';
import MDRenderer from './MDRenderer';

export interface CommentCardProps {
  comment: Comment;
  onLinkPress: any;
}

const CommentCard = ({ comment, onLinkPress }: CommentCardProps) => {
  const { author, score, score_hidden, body_html } = comment;

  return (
    <View padding-10 bg-bgColor>
      {/* username, points, time */}
      <View row centerV>
        <Text flex color={Colors.primary}>
          {author.name}
        </Text>
        <Text color={Colors.tertiaryText} bold>
          {score_hidden ? '•' : score}
        </Text>
        <Text color={Colors.tertiaryText}> | </Text>
        <Text color={Colors.tertiaryText}>t</Text>
      </View>
      {/* body */}
      <View marginV-5>
        {/* <Text>{body}</Text> */}
        <MDRenderer data={body_html} onLinkPress={onLinkPress} />
      </View>
    </View>
  );
};

export default CommentCard;
