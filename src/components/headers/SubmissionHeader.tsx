import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfigHeader from './ConfigHeader';

export interface SubmissionHeaderProps {
  navProps: NativeStackHeaderProps;
}

const SubmissionHeader = ({ navProps }: SubmissionHeaderProps) => {
  return (
    <ConfigHeader
      title={'Comments'}
      subtitle={'Filter'}
      leftIconBehavior={'back'}
    />
  );
};

export default SubmissionHeader;
