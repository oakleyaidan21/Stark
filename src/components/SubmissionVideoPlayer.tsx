import { useEffect, useState } from 'react';
import { Text, View } from 'react-native-ui-lib';
import Video from 'react-native-video';

interface SubmissionVideoPlayerProps {
  videoUrl: string;
  shouldPlay: boolean;
}

const SubmissionVideoPlayer = ({
  videoUrl,
  shouldPlay,
}: SubmissionVideoPlayerProps) => {
  const [paused, setPaused] = useState(!shouldPlay);

  useEffect(() => setPaused(!shouldPlay), [shouldPlay]);

  return (
    <View>
      <Video
        source={{ uri: videoUrl }}
        paused={paused}
        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
      />
    </View>
  );
};

export default SubmissionVideoPlayer;
