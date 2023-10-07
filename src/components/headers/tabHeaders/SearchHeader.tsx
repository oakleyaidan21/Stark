import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInput, TouchableNativeFeedback } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenProps from '../../../types/ScreenProps';
import React from 'react';

const SearchHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  const onType = (text: String) => {
    navigation.setParams({ searchString: text });
  };

  return (
    <View flex center spread row paddingL-10 paddingV-5>
      <View width={30}>
        <TouchableNativeFeedback onPress={navigation.goBack}>
          <Icon name="arrow-left" size={20} color={Colors.oBgColor} />
        </TouchableNativeFeedback>
      </View>
      <TextInput
        style={{
          flex: 1,
          color: Colors.textColor,
          backgroundColor: Colors.textInput,
          borderRadius: 3,
          padding: 8,
        }}
        onChangeText={onType}
        placeholder={'Search Reddit'}
        placeholderTextColor={Colors.tertiaryText}
      />
    </View>
  );
};

export default SearchHeader;
