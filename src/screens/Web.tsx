import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Linking,
  StyleSheet,
  BackHandler,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenProps from '../types/ScreenProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, Text, View } from 'react-native-ui-lib';
import { useFocusEffect } from '@react-navigation/native';
import ConfigHeader from '../components/headers/ConfigHeader';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

type WebProps = NativeStackScreenProps<ScreenProps, 'Web'>;

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

  const createLinkAlert = () =>
    Alert.alert(
      'Follow Link',
      'Do you want to open the original link or the current link?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Original',
          onPress: () => Linking.openURL(props.route.params.url),
        },
        { text: 'Current', onPress: () => Linking.openURL(currUrl) },
      ],
    );

  const renderHeader = () => {
    return (
      <View bg-bgColor height={50}>
        <View flex row center spread paddingH-10 padding-V-5>
          <Icon
            name="close"
            onPress={props.navigation.goBack}
            color={Colors.oBgColor}
            size={20}
          />
          <View flex marginH-5>
            <Text color={Colors.tertiaryText} numberOfLines={1}>
              {currUrl}
            </Text>
          </View>
          {loading && (
            <ActivityIndicator color={Colors.tertiaryText} size={'small'} />
          )}
        </View>
      </View>
    );
  };

  return (
    <View flex>
      {renderHeader()}
      {/* WEB FUNCTIONS */}
      <View style={s.webFunctions}>
        <Icon name="close" color={Colors.oBgColor} onPress={goBack} size={20} />
        <Icon
          name="arrow-right"
          color={Colors.oBgColor}
          onPress={goForward}
          size={20}
        />
        <Icon
          name="refresh"
          color={Colors.oBgColor}
          onPress={refresh}
          size={20}
        />
        <Icon
          name="link"
          color={Colors.oBgColor}
          onPress={createLinkAlert}
          size={20}
        />
      </View>

      {showWeb && (
        <WebView
          userAgent={
            Platform.OS === 'android'
              ? 'Chrome/18.0.1025.166 Mobile Safari/535.19'
              : 'Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
          }
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
