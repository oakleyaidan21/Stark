import React from 'react';
import { Dimensions } from 'react-native';
import useGetRGInfo from '../hooks/useGetRGInfo';
import ScaledImage from './ScaledImage';

interface RGImageProps {
  url: string;
}

const ww = Dimensions.get('window').width;

const RGImage = ({ url }: RGImageProps) => {
  const tokens = url.split('/');
  console.log('tokens!', tokens);
  const identifier = tokens[tokens.length - 1].split('.')[0];
  const { gifInfo, authInfo } = useGetRGInfo(identifier);

  const headers = {
    Authorization: `Bearer ${authInfo?.token}`,
    'User-Agent': authInfo?.agent,
    'User-Addr': authInfo?.addr,
  };

  const style = {
    width: ww,
    height: gifInfo
      ? gifInfo['gif']['height'] * (ww / gifInfo['gif']['width'])
      : 0,
  };

  console.log('gifInfo', gifInfo);

  return (
    gifInfo && (
      <ScaledImage url={gifInfo['gif']['urls']['hd']} isSpoiler={false} />
    )
  );
};

export default RGImage;
