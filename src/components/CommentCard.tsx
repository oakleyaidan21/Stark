import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { LayoutAnimation, TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { Comment } from 'snoowrap';
import ScreenProps from '../types/ScreenProps';
import { getTimeSincePosted } from '../util/RedditUtil';
import MDRenderer from './MDRenderer';
import ContentActionBar from './ContentActionBar';

export interface CommentCardProps {
  comment: Comment;
  onLinkPress?: any;
  index?: number;
  disableExpand?: boolean;
}

const CommentCard = ({
  comment,
  onLinkPress,
  index = 0,
  disableExpand = false,
}: CommentCardProps) => {
  const {
    id,
    author,
    score,
    score_hidden,
    body_html,
    replies,
    created_utc,
    is_submitter,
    author_flair_text,
  } = comment;
  const [expandReplies, setExpandReplies] = useState(false);
  const [expandContentBar, setExpandContentBar] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const hasReplies = replies.length > 0;

  const animateReplies = () => {
    if (!disableExpand) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpandReplies(!expandReplies);
    }
  };

  const animateContentBar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandContentBar(!expandContentBar);
  };

  const goToUser = () => {
    navigation.push('UserScreen', { name: author.name });
  };

  return (
    <View
      bg-bgColor
      style={{
        borderLeftColor: Colors.borderColor,
        borderLeftWidth: index === 0 ? 0 : 1,
      }}>
      <TouchableWithoutFeedback
        onPress={animateReplies}
        onLongPress={animateContentBar}>
        <View padding-10>
          {/* username, points, time */}
          <View row centerV>
            <View centerV flex row>
              <TouchableWithoutFeedback onPress={goToUser}>
                <Text color={is_submitter ? 'lightblue' : Colors.primary}>
                  {author.name}
                </Text>
              </TouchableWithoutFeedback>
              <Text
                color={Colors.tertiaryText}
                style={{ fontSize: 10, marginLeft: 5, flex: 1 }}
                numberOfLines={1}>
                {author_flair_text}
              </Text>
            </View>
            {hasReplies && (
              <>
                <Text bold color={Colors.tertiaryText}>
                  +{replies.length}
                </Text>
                <Text color={Colors.tertiaryText}> | </Text>
              </>
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
            <MDRenderer
              data={body_html}
              id={id}
              onLinkPress={url => {
                if (onLinkPress) onLinkPress(url);
              }}
            />
          </View>
          {expandContentBar && (
            <ContentActionBar content={comment} size={'sm'} />
          )}
        </View>
      </TouchableWithoutFeedback>
      {/* children */}
      {expandReplies && (
        <View paddingL-10>
          {replies.map(c => (
            <CommentCard
              key={c.id}
              comment={c}
              onLinkPress={url => {
                if (onLinkPress) onLinkPress(url);
              }}
              index={index + 1}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default CommentCard;
