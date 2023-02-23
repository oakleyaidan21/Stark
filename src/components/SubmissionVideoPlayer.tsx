import { useEffect, useState } from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [scaledHeight, setScaledHeight] = useState<number>(1);
  const [muted, setMuted] = useState(true);

  useEffect(() => setPaused(!shouldPlay), [shouldPlay]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setPaused(!paused)}>
        <Video
          source={{ uri: videoUrl }}
          paused={paused}
          resizeMode={'cover'}
          muted={muted}
          style={{
            width: ww,
            height: scaledHeight ? scaledHeight : undefined,
            aspectRatio: scaledHeight ? undefined : 1,
          }}
          onLoad={response => {
            const { width, height } = response.naturalSize;
            const newHeight = height * (ww / width);
            setScaledHeight(newHeight);
          }}
        />
      </TouchableWithoutFeedback>
      <View
        style={{ position: 'absolute', borderRadius: 15, top: 5, left: 5 }}
        width={30}
        height={30}
        center
        backgroundColor="black">
        <TouchableOpacity onPress={() => setMuted(!muted)}>
          <Icon
            name={muted ? 'volume-off' : 'volume-high'}
            size={18}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubmissionVideoPlayer;
