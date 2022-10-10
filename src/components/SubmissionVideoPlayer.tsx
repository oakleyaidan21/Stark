import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import Video from 'react-native-video';

const ww = Dimensions.get('window').width;

interface SubmissionVideoPlayerProps {
  videoUrl: string;
  shouldPlay: boolean;
}

const SubmissionVideoPlayer = ({
  videoUrl,
  shouldPlay,
}: SubmissionVideoPlayerProps) => {
  const [paused, setPaused] = useState(!shouldPlay);
  const [scaledHeight, setScaledHeight] = useState<number>();

  useEffect(() => setPaused(!shouldPlay), [shouldPlay]);

  console.log('Scaled height', scaledHeight);

  return (
    <View>
      <Video
        source={{ uri: videoUrl }}
        paused={paused}
        resizeMode={'cover'}
        style={{
          width: ww,
          height: scaledHeight,
          aspectRatio: scaledHeight ? undefined : 1,
        }}
        onLoad={response => {
          const { width, height } = response.naturalSize;
          setScaledHeight(height * (ww / width));
        }}
      />
    </View>
  );
};

export default SubmissionVideoPlayer;
