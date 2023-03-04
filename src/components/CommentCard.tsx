import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Comment } from 'snoowrap';
import { getTimeSincePosted } from '../util/RedditUtil';
import MDRenderer from './MDRenderer';

export interface CommentCardProps {
  comment: Comment;
  onLinkPress: any;
  index?: number;
}

const CommentCard = ({ comment, onLinkPress, index = 0 }: CommentCardProps) => {
  const {
    author,
    score,
    score_hidden,
    body_html,
    replies,
    created_utc,
    is_submitter,
  } = comment;
  const [expandReplies, setExpandReplies] = useState(false);

  const hasReplies = replies.length > 0;

  return (
    <View
      bg-bgColor
      style={{
        borderLeftColor: Colors.borderColor,
        borderLeftWidth: index === 0 ? 0 : 1,
      }}>
      <TouchableWithoutFeedback
        onPress={() => setExpandReplies(!expandReplies)}>
        <View padding-10>
          {/* username, points, time */}
          <View row centerV>
            <Text flex color={is_submitter ? 'lightblue' : Colors.primary}>
              {author.name}
            </Text>
            {hasReplies && (
              <Text bold color={Colors.tertiaryText}>
                +{replies.length} |{' '}
              </Text>
            )}
            <Text color={Colors.tertiaryText} bold>
              {score_hidden ? '•' : score}
            </Text>
            <Text color={Colors.tertiaryText}> | </Text>
            <Text color={Colors.tertiaryText}>
              {getTimeSincePosted(created_utc)}
            </Text>
          </View>
          {/* body */}
          <View marginV-5>
            <MDRenderer data={body_html} onLinkPress={onLinkPress} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* children */}
      {expandReplies && (
        <View paddingL-10>
          {replies.map(c => (
            <CommentCard
              key={c.id}
              comment={c}
              onLinkPress={onLinkPress}
              index={index + 1}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default CommentCard;
