import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-ui-lib';
import RenderHtml from 'react-native-render-html';
import SpoilerText from './SpoilerText';
import { Linking } from 'react-native';

type MDRendererProps = {
  data: string;
  onLinkPress: any;
};

const MDRenderer = ({ data, onLinkPress }: MDRendererProps) => {
  const renderSpecificNodes = useCallback(
    (node, index, siblings, parent, defaultRenderer) => {
      if (node.attribs) {
        if (node.attribs.class) {
          if (node.attribs.class === 'md-spoiler-text') {
            return (
              // / <View style={{ alignSelf: "center" }}>
              <SpoilerText node={node} />
              // <Text style={{ color: "blue" }}>hi</Text>
              // </View>
            );
          }
        }
      }

      return undefined;
    },
    [],
  );

  return (
    <RenderHtml
      source={{ html: data }}
      defaultTextProps={{
        style: { color: Colors.textColor },
        onPress: onLinkPress,
      }}
    />
  );
};

const htmlstyles = StyleSheet.create({
  div: {
    color: 'white',
  },
  cfr: {},
  blockquote: {
    paddingLeft: 10,
    fontStyle: 'italic',
    marginLeft: 50,
    color: 'grey',
  },
});

export default MDRenderer;
