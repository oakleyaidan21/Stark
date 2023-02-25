import React, { useState } from 'react';
import { Text } from 'react-native-ui-lib';

interface SpoilerTextProps {
  text: string;
}

const SpoilerText = ({ text }: SpoilerTextProps) => {
  const [showSpoiler, setShowSpoiler] = useState(false);
  return (
    <Text
      style={{
        color: showSpoiler ? 'black' : 'lightgrey',
        backgroundColor: 'lightgrey',
      }}
      onPress={() => setShowSpoiler(!showSpoiler)}>
      {text}
    </Text>
  );
};

export default SpoilerText;
