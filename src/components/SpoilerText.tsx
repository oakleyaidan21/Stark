import React, { useState } from 'react';
import { Text } from 'react-native-ui-lib';
import { HTMLViewNode } from 'react-native-htmlview';

interface SpoilerTextProps {
  node: HTMLViewNode;
}

const SpoilerText = ({ node }: SpoilerTextProps) => {
  const [showSpoiler, setShowSpoiler] = useState(false);
  return (
    <Text
      style={{
        color: showSpoiler ? 'black' : 'lightgrey',
        backgroundColor: 'lightgrey',
      }}
      onPress={() => setShowSpoiler(!showSpoiler)}>
      {node.children[0].data}
    </Text>
  );
};

export default SpoilerText;
