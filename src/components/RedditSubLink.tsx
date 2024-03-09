import React from 'react';
import { Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

interface RedditSubLinkProps {
  subredditNamePrefixed: string;
}

export const RedditSubLink = ({
  subredditNamePrefixed,
}: RedditSubLinkProps) => {
  const prefixRemoved = subredditNamePrefixed.split('/').at(-1);
  const navigation = useNavigation();

  const onPress = () => {
    navigation.push('SubredditScreen', {
      subreddit: prefixRemoved,
    });
  };

  return (
    <Text bold numberOfLines={1} onPress={onPress}>
      {subredditNamePrefixed}
    </Text>
  );
};
