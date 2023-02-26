import React from 'react';
import { Colors } from 'react-native-ui-lib';
import RenderHtml from 'react-native-render-html';
import { Dimensions } from 'react-native';

type MDRendererProps = {
  data: string;
  onLinkPress: (url: string) => void;
};

const MDRenderer = ({ data, onLinkPress }: MDRendererProps) => {
  const renderersProps = {
    a: { onPress: (_: any, href: string) => onLinkPress(href) },
  };

  return (
    <RenderHtml
      source={{ html: data }}
      defaultTextProps={{
        style: { color: Colors.textColor },
      }}
      contentWidth={Dimensions.get('window').width}
      renderersProps={renderersProps}
      classesStyles={{
        blockquote: {
          paddingLeft: 10,
          fontStyle: 'italic',
          marginLeft: 50,
          color: 'grey',
        },
      }}
      baseStyle={{
        marginVertical: -4,
      }}
    />
  );
};

export default MDRenderer;
