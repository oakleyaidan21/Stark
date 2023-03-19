import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Linking,
  Dimensions,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenProps from '../types/ScreenProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from 'react-native-ui-lib';
import { useFocusEffect } from '@react-navigation/native';

type WebProps = NativeStackScreenProps<ScreenProps, 'Web'>;

const width = Dimensions.get('window').width;

const Web: React.FC<WebProps> = props => {
  const webRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [currUrl, setCurrUrl] = useState(props.route.params.url);
  const [showWeb, setShowWeb] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('transitionEnd', () => {
      setShowWeb(true);
    });
    return unsubscribe;
  }, [props.navigation]);

  const onNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      if (currUrl !== navState.url) {
        setCurrUrl(navState.url);
      }
      setCanGoBack(navState.canGoBack);
    },
    [currUrl, setCurrUrl, setCanGoBack],
  );

  const goBack = () => {
    if (webRef.current) {
      webRef.current.goBack();
    }
  };

  const goForward = () => {
    if (webRef.current) {
      webRef.current.goForward();
    }
  };

  const refresh = () => {
    if (webRef.current) webRef.current.reload();
  };

  const onLoadEnd = () => setLoading(false);
  const onLoadStart = () => setLoading(true);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (canGoBack) {
          goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [canGoBack, goBack]),
  );

  return (
    <View style={{ flex: 1 }}>
      {/* WEB FUNCTIONS */}
      <View style={s.webFunctions}>
        <Icon
          name="arrow-left"
          color={Colors.oBgColor}
          onPress={goBack}
          size={25}
        />
        <Icon
          name="arrow-right"
          color={Colors.oBgColor}
          onPress={goForward}
          size={25}
        />
        <Icon
          name="refresh"
          color={Colors.oBgColor}
          onPress={refresh}
          size={25}
        />
        <Icon
          name="link"
          color={Colors.oBgColor}
          onPress={() => Linking.openURL(props.route.params.url)}
          size={25}
        />
      </View>

      {showWeb && (
        <WebView
          mediaPlaybackRequiresUserAction={true}
          javaScriptCanOpenWindowsAutomatically={false}
          style={{ flex: 1, opacity: 0.9, backgroundColor: 'black' }} // Opacity set to 0.99 to fix completely random bug: https://github.com/react-native-webview/react-native-webview/issues/811
          onNavigationStateChange={onNavigationStateChange}
          source={{ uri: props.route.params.url }}
          ref={webRef}
          allowsFullscreenVideo={true}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  webFunctions: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
});

export default Web;
