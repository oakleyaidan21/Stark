import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import ImageViewer from './ImageViewer';
import ScaledImage from './ScaledImage';

export interface GalleryViewerProps {
  images: Array<{ uri: string }>;
  noModal?: boolean;
}

const GalleryViewer = ({ images, noModal }: GalleryViewerProps) => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {images.length > 0 && (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowGallery(true);
          }}
          disabled={noModal}>
          <View>
            <ScaledImage url={images[0].uri} />
          </View>
        </TouchableWithoutFeedback>
      )}
      {!noModal && (
        <ImageViewer
          visible={showGallery}
          images={images}
          close={() => setShowGallery(false)}
        />
      )}

      <View style={s.pageLength}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          {images.length} images
        </Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  pageLength: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.bgColor,
    padding: 10,
    borderRadius: 3,
  },
});

export default GalleryViewer;
