import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainTabBar = ({
  state: { routeNames, index },
  navigation: { navigate },
}: BottomTabBarProps) => {
  return (
    <View center>
      <View height={40} row spread padding-5 width={'90%'}>
        {routeNames.map(name => {
          return (
            <TouchableNativeFeedback key={name} onPress={() => navigate(name)}>
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
