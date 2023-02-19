import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

const SearchHeader = () => {
  const navigation = useNavigation();

  const onType = (text: String) => {
    (navigation as any).setParams({ searchString: text });
  };

  return (
    <View flex center spread row padding-20 bg-bgColor paddingH-10 paddingV-5>
      <TextInput
        style={{
          flex: 1,
        }}
        onChangeText={onType}
        placeholder={'Search Reddit'}
      />
    </View>
  );
};

export default SearchHeader;
