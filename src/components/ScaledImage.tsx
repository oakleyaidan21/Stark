import { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { View } from 'react-native-ui-lib';

interface ScaledImageProps {
  url: string;
}

const ww = Dimensions.get('window').width;

const ScaledImage = ({ url }: ScaledImageProps) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    Image.getSize(url, (w, h) => {
      const ratio = ww / w;
      setHeight(h * ratio);
    });
  }, []);

  const style = {
    width: '100%',
    height: height,
  };

  return (
    <Image source={{ uri: url }} progressiveRenderingEnabled style={style} />
  );
};

export default ScaledImage;
