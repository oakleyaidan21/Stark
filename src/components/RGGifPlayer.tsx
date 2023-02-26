import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { LoaderScreen, Text, View } from 'react-native-ui-lib';
import { Image } from 'react-native';
import WebView from 'react-native-webview';
import useGetRGInfo from '../hooks/useGetRGInfo';
import { useState } from 'react';

interface RGGifPlayerProps {
  url: string;
  shouldPlay: boolean;
}

const ww = Dimensions.get('window').width;

const RGGifPlayer = ({ url, shouldPlay }: RGGifPlayerProps) => {
  const tokens = url.split('/');
  const identifier = tokens[tokens.length - 1];
  const { gifInfo, authInfo } = useGetRGInfo(identifier);

  const [showVideo, setShowVideo] = useState(shouldPlay);

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

  return gifInfo ? (
    !showVideo ? (
      <TouchableWithoutFeedback onPress={() => setShowVideo(true)}>
        <Image
          style={style}
          source={{ uri: gifInfo['gif']['urls']['poster'], headers: headers }}
          onError={error => {
            console.log('error getting image', error);
          }}
        />
      </TouchableWithoutFeedback>
    ) : (
      <WebView
        source={{
          uri: gifInfo['gif']['urls']['hd'],
          headers: headers,
        }}
        style={style}
        mediaPlaybackRequiresUserAction
        allowsFullscreenVideo
      />
    )
  ) : (
    <View marginT-200>
      <LoaderScreen />
    </View>
  );
};

export default RGGifPlayer;
