import React, { useCallback } from 'react';
import { Comment } from 'snoowrap';
import { useGetSavedContent } from '../../hooks/useGetSavedContent';
import { View } from 'react-native-ui-lib';
import { isComment, onLinkPress } from '../../util/RedditUtil';
import { FlatList, ListRenderItemInfo } from 'react-native';
import CommentCard from '../CommentCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenProps from '../../types/ScreenProps';

export const SavedUserCommentList = () => {
  const { listing } = useGetSavedContent();

  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const onPress = (comment: Comment) => {
    navigation.push('Submission', { id: comment.parent_id });
  };

  const openLink = useCallback((url: string) => {
    onLinkPress(url, navigation);
  }, []);

  const _renderItem = useCallback(({ item }: ListRenderItemInfo<Comment>) => {
    if (isComment(item)) {
      return (
        <CommentCard comment={item} onLinkPress={openLink} onPress={onPress} />
      );
    }

    return null;
  }, []);

  return (
    <View flex>
      <FlatList data={listing} style={{ flex: 1 }} renderItem={_renderItem} />
    </View>
  );
};
