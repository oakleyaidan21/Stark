import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import useGetSubredditIcon from '../hooks/useGetSubredditIcon';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface RedditSubLinkProps {
  subredditNamePrefixed: string;
}

export const RedditSubLink = ({
  subredditNamePrefixed,
}: RedditSubLinkProps) => {
  const prefixRemoved = subredditNamePrefixed.split('/r/')[1];
  const iconUrl = useGetSubredditIcon(prefixRemoved);
  const iconSize = 20;
  const navigation = useNavigation();

  const onPress = () => {
    navigation.push('SubredditScreen', {
      subreddit: prefixRemoved,
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        padding-3
        flex
        row
        center
        style={{ borderRadius: 5, alignSelf: 'baseline' }}
        bg-emptyBgColor>
        <FastImage
          source={{ uri: iconUrl }}
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize / 2,
            marginRight: 5,
          }}
        />
        <Text bold numberOfLines={1}>
          {subredditNamePrefixed}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
