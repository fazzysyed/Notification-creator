import {AppRegistry} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNAndroidNotificationListenerHeadlessJsName} from 'react-native-android-notification-listener';

import App from './App';
import {headlessNotificationListener} from './App';
import {name as appName} from './app.json';
import {LocalNotification} from './src/components/NotificationHandler';
import PushNotification from 'react-native-push-notification';

/**
 * AppRegistry should be required early in the require sequence
 * to make sure the JS execution environment is setup before other
 * modules are required.
 */

AppRegistry.registerHeadlessTask(
  RNAndroidNotificationListenerHeadlessJsName,
  () => headlessNotificationListener,
);

AppRegistry.registerComponent(appName, () => App);
