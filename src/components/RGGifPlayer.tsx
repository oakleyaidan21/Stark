import { Dimensions } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { Image } from 'react-native';
import WebView from 'react-native-webview';
import useGetRGInfo from '../hooks/useGetRGInfo';

interface RGGifPlayerProps {
  url: string;
  shouldPlay: boolean;
  inList?: boolean;
}

const ww = Dimensions.get('window').width;

const RGGifPlayer = ({ url, shouldPlay, inList }: RGGifPlayerProps) => {
  const tokens = url.split('/');
  const identifier = tokens[tokens.length - 1];
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

  return gifInfo ? (
    // <SubmissionVideoPlayer
    //   videoUrl={gifInfo['gif']['urls']['hd']}
    //   shouldPlay={shouldPlay}
    //   headers={headers}
    // />
    inList ? (
      <Image
        style={style}
        source={{ uri: gifInfo['gif']['urls']['poster'], headers: headers }}
        onError={error => {
          console.log('error getting image', error);
        }}
      />
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
    <Text>loading</Text>
  );
};

export default RGGifPlayer;
