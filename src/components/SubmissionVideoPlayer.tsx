import { useRef, useState } from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Colors, Slider, View } from 'react-native-ui-lib';
import Video, { OnProgressData } from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ww = Dimensions.get('window').width;

interface SubmissionVideoPlayerProps {
  videoUrl: string;
}

const SubmissionVideoPlayer = ({ videoUrl }: SubmissionVideoPlayerProps) => {
  const [paused, setPaused] = useState(true);
  const [scaledHeight, setScaledHeight] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(1000);
  const videoRef = useRef<Video>(null);

  const seek = (value: number) => {
    videoRef.current?.seek(value);
  };

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
  };

  const onEnd = () => {
    setEnded(true);
    setCurrentTime(duration);
  };

  const onControlPress = () => {
    if (ended) {
      seek(0);
      setEnded(false);
      setPaused(false);
    } else {
      setPaused(!paused);
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setPaused(!paused)}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          paused={paused}
          resizeMode={'cover'}
          style={{
            width: ww,
            height: scaledHeight ? scaledHeight : undefined,
            aspectRatio: scaledHeight ? undefined : 1,
          }}
          onLoad={response => {
            const { width, height } = response.naturalSize;
            const newHeight = height * (ww / width);
            setScaledHeight(newHeight);
            setDuration(response.duration);
          }}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </TouchableWithoutFeedback>
      {/* Controls */}
      <View row padding-5 centerV>
        {/* play/pause/loop button */}
        <TouchableWithoutFeedback onPress={onControlPress}>
          <Icon
            name={ended ? 'replay' : paused ? 'play' : 'pause'}
            size={23}
            color={Colors.oBgColor}
            style={{ marginRight: 5 }}
          />
        </TouchableWithoutFeedback>
        {/* slider */}
        <Slider
          containerStyle={{ flex: 1 }}
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          onValueChange={seek}
          thumbTintColor={Colors.primary}
          maximumTrackTintColor={'white'}
          minimumTrackTintColor={Colors.primary}
        />
      </View>
    </View>
  );
};

export default SubmissionVideoPlayer;
