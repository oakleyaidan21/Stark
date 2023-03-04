import React, { useContext } from 'react';
import { Text, View } from 'react-native-ui-lib';
import User from '../../components/User';
import StarkContext from '../../context/StarkContext';

const ProfileScreen = () => {
  const { user } = useContext(StarkContext);

  return (
    <View flex>
      {user ? <User info={user} /> : <Text>idk how you got here</Text>}
    </View>
  );
};

export default ProfileScreen;
