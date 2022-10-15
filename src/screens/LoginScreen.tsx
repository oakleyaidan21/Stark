import WebView from 'react-native-webview';
import Snoowrap from 'snoowrap';
import snoowrapConfig from '../config/snoowrapConfig';
import useStarkStorage from '../hooks/useStarkStorage';
import ScreenProps from '../types/ScreenProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type LoginScreenProps = NativeStackScreenProps<ScreenProps, 'Login'>;

const url = Snoowrap.getAuthUrl({
  clientId: snoowrapConfig.clientId,
  scope: [
    'identity',
    'account',
    'flair',
    'edit',
    'history',
    'mysubreddits',
    'privatemessages',
    'read',
    'report',
    'save',
    'submit',
    'subscribe',
    'vote',
    'wikiread',
  ],
  redirectUri: 'https://localhost:8080',
  permanent: true,
}).replace('https://www.', 'https://i.');

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { setRefreshToken, setAuthCode } = useStarkStorage();

  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
      incognito
      onNavigationStateChange={newNavState => {
        if (newNavState.url.includes('https://localhost:8080')) {
          const start_i = newNavState.url.indexOf('code');
          const code = newNavState.url.slice(
            start_i + 5,
            newNavState.url.length - 2,
          );
          console.log(newNavState.url);
          setRefreshToken(null);
          setAuthCode(code);
          navigation.goBack();
        }
      }}
    />
  );
};

export default LoginScreen;
