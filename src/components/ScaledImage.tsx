import { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

interface ScaledImageProps {
  url: string;
}

const ww = Dimensions.get('window').width;

const ScaledImage = ({ url }: ScaledImageProps) => {
  const [height, setHeight] = useState<number>(0);

  const getScaledHeight = () => {
    Image.getSize(url, (w, h) => {
      const ratio = ww / w;
      setHeight(h * ratio);
    });
  };

  useEffect(getScaledHeight, []);

  const style = {
    width: '100%',
    height: height,
  };

  return (
    <Image source={{ uri: url }} style={style} progressiveRenderingEnabled />
  );
};

export default ScaledImage;
