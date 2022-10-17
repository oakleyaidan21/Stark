import React, { useContext } from 'react';
import { Text, View } from 'react-native-ui-lib';
import StarkContext from '../../context/StarkContext';

const ProfileScreen = () => {
  const { user } = useContext(StarkContext);

  return (
    <View flex>
      {user ? (
        <View flex>
          <Text bold>{user.name}</Text>
        </View>
      ) : (
        <Text>idk how you got here</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
