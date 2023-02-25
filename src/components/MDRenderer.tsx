import React from 'react';
import { Colors } from 'react-native-ui-lib';
import RenderHtml from 'react-native-render-html';

type MDRendererProps = {
  data: string;
  onLinkPress: (url: string) => void;
};

const MDRenderer = ({ data, onLinkPress }: MDRendererProps) => {
  //   const renderSpecificNodes = useCallback(
  //     (node, index, siblings, parent, defaultRenderer) => {
  //       if (node.attribs) {
  //         if (node.attribs.class) {
  //           if (node.attribs.class === 'md-spoiler-text') {
  //             return (
  //               // / <View style={{ alignSelf: "center" }}>
  //               <SpoilerText node={node} />
  //               // <Text style={{ color: "blue" }}>hi</Text>
  //               // </View>
  //             );
  //           }
  //         }
  //       }

  //       return undefined;
  //     },
  //     [],
  //   );

  return (
    <RenderHtml
      source={{ html: data }}
      defaultTextProps={{
        style: { color: Colors.textColor },
      }}
      renderersProps={{ a: { onPress: (_, href) => onLinkPress(href) } }}
    />
  );
};

// const htmlstyles = StyleSheet.create({
//   div: {
//     color: 'white',
//   },
//   cfr: {},
//   blockquote: {
//     paddingLeft: 10,
//     fontStyle: 'italic',
//     marginLeft: 50,
//     color: 'grey',
//   },
// });

export default MDRenderer;
