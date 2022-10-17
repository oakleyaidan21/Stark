import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import {
  ActionSheet,
  ButtonProps,
  Colors,
  Image,
  Text,
  View,
} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useStarkStorage from '../hooks/useStarkStorage';

export interface UserSelectorProps {
  visible: boolean;
  setVisible: any;
}

const UserSelector = ({ visible, setVisible }: UserSelectorProps) => {
  const navigation = useNavigation();

  const { users, setRefreshToken } = useStarkStorage();

  const userItems = Object.keys(users).map((user: string) => {
    return {
      label: user,
      onPress: () => setRefreshToken(users[user].refreshToken),
    };
  });

  const options = [
    ...userItems,
    { label: 'Add User', onPress: () => navigation.navigate('Login') },
    { label: 'Anonymous', onPress: () => setRefreshToken(null) },
  ];

  const getLeftIcon = (label: string | undefined) => {
    switch (label) {
      case 'Anonymous':
        return <Icon name="incognito" size={25} color={Colors.textColor} />;
      case 'Add User':
        return <Icon name="plus" size={25} color={Colors.textColor} />;
      default:
        return label ? (
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{ uri: users[label].pfpUrl }}
          />
        ) : (
          <></>
        );
    }
  };

  const _renderAction = (
    { label }: ButtonProps,
    index: number,
    onOptionPress: any,
  ) => {
    return (
      <TouchableNativeFeedback onPress={() => onOptionPress(index)} key={label}>
        <View centerV height={40} paddingL-10>
          <View row centerV>
            <View
              width={30}
              height={30}
              center
              marginR-10
              style={{ borderRadius: 5 }}
              backgroundColor={'grey'}>
              {getLeftIcon(label)}
            </View>
            <Text>{label}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <ActionSheet
      bg-bgColor
      containerStyle={{ backgroundColor: Colors.bgColor }}
      dialogStyle={{ backgroundColor: Colors.bgColor, paddingBottom: 10 }}
      migrateDialog
      optionsStyle={{ backgroundColor: Colors.bgColor }}
      options={options}
      renderAction={_renderAction}
      visible={visible}
      onDismiss={() => setVisible(false)}
    />
  );
};

export default UserSelector;
