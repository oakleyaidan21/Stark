import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageProps,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MDRenderer from './MDRenderer';

interface ScaledImageProps {
  url: string;
  imageProps?: ImageProps;
  isSpoiler: boolean;
  selfText?: any;
}

const ww = Dimensions.get('window').width;

const ScaledImage = ({
  url,
  imageProps,
  isSpoiler,
  selfText,
}: ScaledImageProps) => {
  const [height, setHeight] = useState<number>(0);
  const [blurImage, setBlurImage] = useState(isSpoiler ? true : false);
  const [loading, setLoading] = useState(true);

  const getScaledHeight = () => {
    Image.getSize(url, (w, h) => {
      const ratio = ww / w;
      setHeight(h * ratio);
      setLoading(false);
    });
  };

  useEffect(getScaledHeight, []);

  const style = {
    width: '100%',
    height: height,
  };

  return loading ? (
    <View height={50} center>
      <Icon name="image" color={Colors.oBgColor} size={30} />
    </View>
  ) : (
    <View style={style}>
      <Image
        source={{ uri: url }}
        style={{ flex: 1 }}
        progressiveRenderingEnabled
        {...imageProps}
        blurRadius={blurImage ? 15 : 0}
      />
      {blurImage && (
        <View style={{ ...style, position: 'absolute', top: 0 }} flex center>
          <Text marginB-10>Show sensitive content?</Text>
          <TouchableWithoutFeedback onPress={() => setBlurImage(false)}>
            <Text bold>Show</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
      {selfText && <MDRenderer data={selfText} onLinkPress={() => {}} />}
    </View>
  );
};

export default ScaledImage;
