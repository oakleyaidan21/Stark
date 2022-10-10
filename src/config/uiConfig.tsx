import { Colors, ThemeManager, Typography } from 'react-native-ui-lib';

export const loadUIConfig = () => {
  Colors.loadSchemes({
    light: {
      textColor: Colors.black,
      bgColor: Colors.white,
      oBgColor: Colors.black,
      hfBorderColor: Colors.black,
      unfocusedTab: '#4a4a4a',
      seeCommentsColor: '#a3a3a3',
    },
    dark: {
      textColor: Colors.white,
      bgColor: Colors.black,
      oBgColor: Colors.white,
      hfBorderColor: '#4a4a4a',
      unfocusedTab: '#4a4a4a',
      seeCommentsColor: '#a3a3a3',
    },
  });

  Colors.loadColors({
    subOutline: '#' + Math.floor(Math.random() * 16777215).toString(16),
    upvoted: '#ff4500',
    downvoted: '#7193ff',
  });

  Typography.loadTypographies({
    postTitle: { fontSize: 14, fontWeight: 'bold' },
    homeSubTitle: { fontSize: 24, fontWeight: 'bold' },
    bold: { fontWeight: 'bold' },
    commentOptions: { fontSize: 12, fontWeight: 'bold', color: '#a3a3a3' },
  });

  ThemeManager.setComponentTheme('Image', {
    fadeDuration: 0,
  });

  ThemeManager.setComponentTheme('LoaderScreen', {
    color: Colors.oBgColor,
  });
};
