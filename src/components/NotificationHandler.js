import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {CheckBox} from 'native-base';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  // requestPermissions: true
  requestpermission: Platform.Os === 'ios',
});

export const LocalNotification = (title, content, channelId, sound) => {
  PushNotification.localNotification({
    channelId: channelId,
    autoCancel: false,
    // bigText: "",
    //   bigText:
    //     'This is local notification demo in React Native app. Only shown, when expanded.',
    //   subText: 'Local Notification Demo',
    title: title,
    //   title: 'Local Notification Title',
    message: content,
    vibrate: true,
    vibration: 100,
    playSound: true,
    // soundName: `${sound}.mp3`,
    //   actions: '["Yes", "No"]'
  });
};
