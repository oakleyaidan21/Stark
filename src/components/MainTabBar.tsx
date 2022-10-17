import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useStarkStorage from '../hooks/useStarkStorage';
import UserSelector from './UserSelector';

const MainTabBar = ({
  state: { routeNames, index },
  navigation: { navigate },
}: BottomTabBarProps) => {
  const { users } = useStarkStorage();
  const [showUserSelector, setShowUserSelector] = useState(false);
  const noUsers = Object.keys(users).length === 0;
  return (
    <View center bg-bgColor>
      <View height={50} row spread padding-5 width={'90%'} centerV>
        {routeNames.map((name, i) => {
          const focused = i === index;
          const onPress = () => {
            if (name === 'Profile' && noUsers) {
              setShowUserSelector(true);
            } else {
              navigate(name);
            }
          };
          const onLongPress = () => {
            if (name === 'Profile') {
              setShowUserSelector(true);
            }
          };
          return (
            <TouchableNativeFeedback
              key={name}
              onPress={onPress}
              onLongPress={onLongPress}>
              <Icon
                name={iconNameForRouteName(name)}
                color={focused ? Colors.primary : 'grey'}
                size={25}
              />
            </TouchableNativeFeedback>
          );
        })}
      </View>
      <UserSelector
        visible={showUserSelector}
        setVisible={setShowUserSelector}
      />
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
