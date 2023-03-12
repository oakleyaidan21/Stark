import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { Text, View } from 'react-native-ui-lib';

export interface ImageViewProps {
  visible: boolean;
  images: Array<{ uri: string }>;
  close: any;
}

const ImageViewer = ({ visible, images, close }: ImageViewProps) => {
  const renderFooter = useCallback(({ imageIndex }: any) => {
    return images.length > 1 ? (
      <View center style={{ bottom: 50 }}>
        <View padding-10 bg-bgColor style={{ borderRadius: 3 }}>
          <Text bold style={{ fontSize: 20 }}>
            {imageIndex + 1 + '/' + images.length}
          </Text>
        </View>
      </View>
    ) : null;
  }, []);

  return (
    <ImageView
      images={images}
      visible={visible}
      imageIndex={0}
      onRequestClose={close}
      swipeToCloseEnabled={Platform.OS == 'ios'}
      FooterComponent={renderFooter}
    />
  );
};

export default ImageViewer;
