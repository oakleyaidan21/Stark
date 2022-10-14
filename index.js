/**
 * @format
 */

import { AppRegistry } from 'react-native';
require('react-native-ui-lib/config').setConfig({ appScheme: 'dark' });
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
