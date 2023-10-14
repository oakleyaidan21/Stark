import React, { memo } from 'react';
import { Colors } from 'react-native-ui-lib';
import RenderHtml from 'react-native-render-html';
import { Dimensions } from 'react-native';

type MDRendererProps = {
  data: string;
  id?: string;
  onLinkPress: (url: string) => void;
};

const baseStyles = {
  marginVertical: -4,
};

const tagsStyles = {
  ul: {
    color: Colors.textColor,
  },
  ol: {
    color: Colors.textColor,
  },
  blockquote: {
    fontStyle: 'italic',
    color: Colors.tertiaryText,
  },
} as any;

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
      baseStyle={baseStyles}
      tagsStyles={tagsStyles}
    />
  );
};

const propsAreEqual = (
  prevProps: MDRendererProps,
  newProps: MDRendererProps,
) => {
  if (newProps.id && prevProps.id) {
    return newProps.id != prevProps.id;
  }
  return prevProps.data != newProps.data;
};

export default memo(MDRenderer, propsAreEqual);
