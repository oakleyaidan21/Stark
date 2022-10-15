import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useStarkStorage from '../hooks/useStarkStorage';

const MainTabBar = ({
  state: { routeNames, index },
  navigation: { navigate },
}: BottomTabBarProps) => {
  const { users } = useStarkStorage();
  const noUsers = Object.keys(users).length === 0;
  return (
    <View center bg-bgColor>
      <View height={50} row spread padding-5 width={'90%'} centerV>
        {routeNames.map(name => {
          const onPress = () => {
            if (name === 'Profile' && noUsers) {
              navigate('Login');
            } else {
              navigate(name);
            }
          };
          return (
            <TouchableNativeFeedback key={name} onPress={onPress}>
              <Icon
                name={iconNameForRouteName(name)}
                color={'grey'}
                size={25}
              />
            </TouchableNativeFeedback>
          );
        })}
      </View>
    </View>
  );
};

const iconNameForRouteName = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Profile':
      return 'account';
    default:
      return 'home';
  }
};

export default MainTabBar;
