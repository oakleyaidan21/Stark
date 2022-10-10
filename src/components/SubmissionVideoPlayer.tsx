import { Text, View } from 'react-native-ui-lib';

interface SubmissionVideoPlayerProps {
  videoUrl: string;
}

const SubmissionVideoPlayer = ({ videoUrl }: SubmissionVideoPlayerProps) => {
  return (
    <View>
      <Text>{videoUrl}</Text>
    </View>
  );
};

export default SubmissionVideoPlayer;
