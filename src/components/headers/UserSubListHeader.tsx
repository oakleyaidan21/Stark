import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInput, TouchableWithoutFeedback } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenProps from '../../types/ScreenProps';

const UserSubListHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const onType = (text: String) => {
    navigation.setParams({ searchString: text });
  };

  return (
    <View
      flex
      center
      spread
      row
      padding-20
      bg-bgColor
      centerV
      paddingH-10
      paddingV-5>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Icon name={'close'} color={Colors.white} size={20} />
      </TouchableWithoutFeedback>
      <TextInput
        style={{
          flex: 1,
          color: Colors.textColor,
          backgroundColor: Colors.textInput,
          borderRadius: 3,
          padding: 8,
          marginLeft: 10,
        }}
        onChangeText={onType}
        placeholder={'Search Subs'}
        placeholderTextColor={Colors.tertiaryText}
      />
    </View>
  );
};

export default UserSubListHeader;
