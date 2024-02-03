import React, { useEffect, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScaledImage from './ScaledImage';
import { onLinkPress } from '../util/RedditUtil';
import { useNavigation } from '@react-navigation/native';

export interface RedditPreviewImageProps {
  url: string;
}

export const RedditPreviewImage = ({ url }: RedditPreviewImageProps) => {
  const [showImage, setShowImage] = useState<Boolean | undefined>(undefined);

  const navigation = useNavigation();

  useEffect(() => {
    // this is to prevent the component from animating on its first layout
    if (showImage !== undefined) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [showImage]);

  return (
    <View flex style={{ borderRadius: 5 }} bg-emptyBgColor>
      <View flex row padding-10 centerV>
        <TouchableOpacity onPress={() => onLinkPress(url, navigation)}>
          <Image
            source={{ uri: url }}
            width={50}
            height={50}
            style={{ marginRight: 10, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() => setShowImage(showImage ? false : true)}>
          <View flex row centerV height={'100%'}>
            <View row centerV flex>
              <Icon name="image" color={Colors.tertiaryText} size={20} />
              <Text bold style={{ color: Colors.tertiaryText }} margin-5>
                Image
              </Text>
            </View>
            <Icon
              name={!showImage ? 'chevron-down' : 'chevron-up'}
              size={20}
              color={Colors.tertiaryText}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {showImage && <ScaledImage url={url} isSpoiler={false} />}
    </View>
  );
};
