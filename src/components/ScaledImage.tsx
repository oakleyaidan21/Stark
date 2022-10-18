import { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import { View } from 'react-native-ui-lib';

interface ScaledImageProps {
  url: string;
}

const ww = Dimensions.get('window').width;

const ScaledImage = ({ url }: ScaledImageProps) => {
  const [height, setHeight] = useState<number>(0);

  const onLoadEnd = (event: OnLoadEvent) => {
    const {
      nativeEvent: { width, height },
    } = event;
    const ratio = ww / width;
    setHeight(height * ratio);
  };

  const style = {
    width: '100%',
    height: height,
  };

  return <FastImage source={{ uri: url }} style={style} onLoad={onLoadEnd} />;
};

export default ScaledImage;
