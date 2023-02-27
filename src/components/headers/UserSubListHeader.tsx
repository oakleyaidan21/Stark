import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableWithoutFeedback } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserSubListHeader = () => {
  const navigation = useNavigation();

  const onType = (text: String) => {
    (navigation as any).setParams({ searchString: text });
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
