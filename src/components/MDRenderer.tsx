import React, { memo } from 'react';
import { Colors, Text } from 'react-native-ui-lib';
import RenderHtml from 'react-native-render-html';
import { Dimensions } from 'react-native';
import { RedditPreviewImage } from './RedditPreviewImage';
import { RedditSubLink } from './RedditSubLink';

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

const RedditLinkRenderer = ({ InternalRenderer, ...props }) => {
  const text = props.tnode.init.textNode?.data;
  if (isRedditPreviewImage(text)) {
    return <RedditPreviewImage url={text} />;
  }
  if (isRedditSubLink(text)) {
    return <RedditSubLink subredditNamePrefixed={text} />;
  }
  return <InternalRenderer {...props} />;
};

const MDRenderer = ({ data, onLinkPress }: MDRendererProps) => {
  const renderersProps = {
    a: { onPress: (_: any, href: string) => onLinkPress(href) },
  };

  const renderers = {
    a: RedditLinkRenderer,
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
      renderers={renderers}
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

const isRedditPreviewImage = (imgUrl: string | undefined) =>
  imgUrl?.includes('preview.redd.it');

const isRedditSubLink = (url: string | undefined) => url?.startsWith('/r/');

export default memo(MDRenderer, propsAreEqual);
