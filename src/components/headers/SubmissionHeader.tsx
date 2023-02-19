import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface SubmissionHeaderProps {
  navProps: NativeStackHeaderProps;
}

const SubmissionHeader = ({ navProps }: SubmissionHeaderProps) => {
  return (
    <View flex centerV row paddingH-10 paddingV-5 bg-bgColor>
      <TouchableWithoutFeedback onPress={navProps.navigation.goBack}>
        <Icon name="arrow-left" size={25} color={Colors.oBgColor} />
      </TouchableWithoutFeedback>
      <Text flex bold marginL-10>
        Comments
      </Text>
    </View>
  );
};

export default SubmissionHeader;
