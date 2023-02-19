import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Colors, Text } from 'react-native-ui-lib';
import SubmissionHeader from './headers/SubmissionHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainHeader = (props: NativeStackHeaderProps) => {
  const { route } = props;
  return (
    <View height={50} bg-bgColor center>
      {getContentForRoute(route.name, props)}
    </View>
  );
};

const getContentForRoute = (route: string, props: NativeStackHeaderProps) => {
  switch (route) {
    case 'Submission':
      return <SubmissionHeader navProps={props} />;
    default:
      return (
        <View flex centerV row paddingH-10 paddingV-5 bg-bgColor>
          <View flex>
            <TouchableWithoutFeedback onPress={props.navigation.goBack}>
              <Icon name="arrow-left" size={25} color={Colors.oBgColor} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
  }
};

export default MainHeader;
