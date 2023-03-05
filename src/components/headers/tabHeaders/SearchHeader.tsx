import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInput } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';
import ScreenProps from '../../../types/ScreenProps';

const SearchHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const onType = (text: String) => {
    navigation.setParams({ searchString: text });
  };

  return (
    <View flex center spread row padding-20 bg-bgColor paddingH-10 paddingV-5>
      <TextInput
        style={{
          flex: 1,
          color: Colors.textColor,
        }}
        onChangeText={onType}
        placeholder={'Search Reddit'}
        placeholderTextColor={Colors.tertiaryText}
      />
    </View>
  );
};

export default SearchHeader;
