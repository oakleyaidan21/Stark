import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Comment } from 'snoowrap';
import { abbreviateNumber, getTimeSincePosted } from '../util/RedditUtil';
import ContentActionBar from './ContentActionBar';
import MDRenderer from './MDRenderer';

export interface CommentCardProps {
  comment: Comment;
  onLinkPress: any;
  index?: number;
  op?: string;
}

const CommentCard = ({
  comment,
  onLinkPress,
  index = 0,
  op,
}: CommentCardProps) => {
  const { author, score, score_hidden, body_html, replies, created_utc } =
    comment;
  const [expandReplies, setExpandReplies] = useState(true);

  const isOp = op === author.name;

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
            <Text flex color={isOp ? 'lightblue' : Colors.primary}>
              {author.name}
            </Text>
            {!expandReplies && hasReplies && (
              <View
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 3,
                  paddingHorizontal: 2,
                }}>
                <Text bold>+{replies.length}</Text>
              </View>
            )}
            <Text color={Colors.tertiaryText} bold>
              {' ' + (score_hidden ? '•' : score)}
            </Text>
            <Text color={Colors.tertiaryText}> | </Text>
            <Text color={Colors.tertiaryText}>
              {getTimeSincePosted(created_utc)}
            </Text>
          </View>
          {/* body */}
          {expandReplies && (
            <View marginV-5>
              <MDRenderer data={body_html} onLinkPress={onLinkPress} />
            </View>
          )}

          {/* <View row spread centerV>
            <View style={{ width: 250 }}>
              <ContentActionBar content={comment} size={'sm'} />
            </View>
            {replies.length > 0 && (
              <Text color={Colors.tertiaryText}>
                {abbreviateNumber(replies.length) +
                  ' ' +
                  (replies.length > 1 ? 'replies' : 'reply')}
              </Text>
            )}
          </View> */}
        </View>
      </TouchableWithoutFeedback>
      {/* children */}
      {expandReplies && (
        <View paddingL-10>
          {replies.map(c => (
            <CommentCard
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
