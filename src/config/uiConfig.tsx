import { Colors, ThemeManager, Typography } from 'react-native-ui-lib';

export const loadUIConfig = () => {
  Colors.loadSchemes({
    light: {
      textColor: Colors.black,
      bgColor: Colors.white,
      emptyBgColor: '#E9E9E9',
      selfTextBgColor: '#E9E9E9',
      oBgColor: Colors.black,
      hfBorderColor: Colors.black,
      unfocusedTab: '#4a4a4a',
      seeCommentsColor: '#a3a3a3',
      tertiaryText: '#A1A1A1',
    },
    dark: {
      textColor: Colors.white,
      emptyBgColor: Colors.black,
      selfTextBgColor: '#E9E9E9',
      bgColor: Colors.black,
      oBgColor: Colors.white,
      hfBorderColor: '#4a4a4a',
      unfocusedTab: '#4a4a4a',
      seeCommentsColor: '#a3a3a3',
      tertiaryText: '#A1A1A1',
    },
  });

  Colors.loadColors({
    subOutline: '#' + Math.floor(Math.random() * 16777215).toString(16),
    upvoted: '#ff4500',
    downvoted: '#7193ff',
    primary: '#008EE2',
  });

  Typography.loadTypographies({
    postTitle: { fontSize: 14, fontWeight: 'bold' },
    homeSubTitle: { fontSize: 24, fontWeight: 'bold' },
    bold: { fontWeight: 'bold' },
    commentOptions: { fontSize: 12, fontWeight: 'bold', color: '#a3a3a3' },
  });

  ThemeManager.setComponentTheme('Text', {
    color: Colors.textColor,
  });

  ThemeManager.setComponentTheme('Image', {
    fadeDuration: 0,
  });

  ThemeManager.setComponentTheme('LoaderScreen', {
    color: Colors.oBgColor,
  });
};
