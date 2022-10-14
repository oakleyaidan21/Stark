import React from 'react';
import { Animated, Appearance, StyleProp, ViewStyle } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

export interface FlairProps {
  text: string;
  backgroundColor: string;
  flairTextColor: string;
  style?: StyleProp<ViewStyle> | Animated.AnimatedProps<ViewStyle>;
}

const Flair = ({
  text,
  backgroundColor,
  flairTextColor,
  style,
}: FlairProps) => {
  const getTextColor = () => {
    if (backgroundColor) {
      return flairTextColor === 'dark'
        ? 'black'
        : flairTextColor === 'light'
        ? 'white'
        : flairTextColor;
    } else {
      if (Appearance.getColorScheme() === 'dark') {
        return 'black';
      }
      return 'white';
    }
  };

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (Appearance.getColorScheme() === 'dark') {
      return 'grey';
    }
    return 'black';
  };

  return (
    <View
      padding-3
      style={{
        backgroundColor: getBackgroundColor(),
        borderRadius: 3,
        alignSelf: 'flex-start',
        ...style,
      }}>
      <Text color={getTextColor()} style={{ fontSize: 10 }}>
        {text}
      </Text>
    </View>
  );
};

export default Flair;
