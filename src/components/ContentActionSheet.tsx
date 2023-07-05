import React from 'react';
import { Comment, Submission } from 'snoowrap';
import IconActionSheet from './IconActionSheet';
import { Alert, Platform, Share } from 'react-native';
import { isSubmission } from '../util/RedditUtil';

export interface ContentActionSheetProps {
  content: Submission | Comment;
  visible: boolean;
  setVisible: any;
}

const ContentActionSheet = ({
  content,
  visible,
  setVisible,
}: ContentActionSheetProps) => {
  const isASubmission = isSubmission(content);
  console.log('isASubmission', isASubmission);
  const contentOptions = [
    {
      label: 'Share',
      iconName: 'share-variant',
      onPress: () => {
        Share.share(
          {
            message: isASubmission
              ? Platform.OS == 'ios'
                ? content.title
                : content.url
              : 'Share comment',
            url: isASubmission ? content.url : content.permalink,
          },
          { dialogTitle: isASubmission ? content.title : 'Share Comment' },
        );
      },
    },
    {
      label: 'Report',
      iconName: 'flag',
      onPress: () => {
        Alert.alert('IMPL');
        setVisible(false);
      },
    },
  ];

  return (
    <IconActionSheet
      visible={visible}
      setVisible={setVisible}
      options={contentOptions}
    />
  );
};

export default ContentActionSheet;
