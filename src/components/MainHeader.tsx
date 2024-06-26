import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';
import SubmissionHeader from './headers/SubmissionHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserSubListHeader from './headers/UserSubListHeader';
import CreateCommentHeader from './headers/CreateCommentHeader';

const MainHeader = (props: NativeStackHeaderProps) => {
  const { route } = props;
  const showHeader = renderContainer(route.name);
  return showHeader ? (
    <View height={50} bg-bgColor center>
      {getContentForRoute(route.name, props)}
    </View>
  ) : null;
};

const renderContainer = (routeName: string) => {
  switch (routeName) {
    case 'SearchResultScreen':
    case 'SubredditScreen':
      return false;
    default:
      return true;
  }
};

const getContentForRoute = (route: string, props: NativeStackHeaderProps) => {
  switch (route) {
    case 'Submission':
      return <SubmissionHeader />;
    case 'PostSwiper':
      return <SubmissionHeader />;
    case 'UserSubScreen':
      return <UserSubListHeader />;
    case 'CreateCommentScreen':
      return <CreateCommentHeader />;
    case 'SearchResultScreen':
    case 'SubredditScreen':
      return null;
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
