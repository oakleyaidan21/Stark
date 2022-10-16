import { Colors, Text, View } from 'react-native-ui-lib';
import { Comment } from 'snoowrap';

export interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const { author, score, score_hidden, body } = comment;

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
        <Text>{body}</Text>
      </View>
    </View>
  );
};

export default CommentCard;
