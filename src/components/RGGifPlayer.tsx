import { Text } from 'react-native-ui-lib';
import useGetRGInfo from '../hooks/useGetRGInfo';
import SubmissionVideoPlayer from './SubmissionVideoPlayer';

interface RGGifPlayerProps {
  url: string;
}

const RGGifPlayer = ({ url }: RGGifPlayerProps) => {
  const tokens = url.split('/');
  const identifier = tokens[tokens.length - 1];
  const { info } = useGetRGInfo(identifier);

  return info ? (
    <SubmissionVideoPlayer videoUrl={info['gif']['urls']['hd']} shouldPlay />
  ) : (
    <Text>loading</Text>
  );
};

export default RGGifPlayer;
