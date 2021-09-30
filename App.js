import React, {useState, useEffect} from 'react';
import {Button, View, Text, AppState, Platform} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/components/SignIn';
import StartScreen from './src/components/StartScreen';
import NotificationScreen from './src/components/NotificationScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'native-base';
import Sidebar from './src/components/CustomSidebar/Sidebar';
import Histroy from './src/components/Histroy';
import Splash from './src/components/Splash';
import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';
import RNAndroidNotificationListener, {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalNotification} from './src/components/NotificationHandler';

// import {color} from 'react-native-reanimated';
// import Screen1 from './src/components/Screen1';

//listner
export const headlessNotificationListener = async ({notification}) => {
  console.log('Called');
  if (notification) {
    if (JSON.parse(notification).app != 'com.notificationcreator') {
      AsyncStorage.getItem('Notifications').then(notifications => {
        if (notifications != null) {
          if (
            JSON.parse(notifications).filter(e =>
              JSON.parse(notification)
                .text.toLowerCase()
                .includes(e.content.toLowerCase()),
            )
          ) {
            let array = JSON.parse(notifications).find(e =>
              JSON.parse(notification)
                .text.toLowerCase()
                .includes(e.content.toLowerCase()),
            );
            console.log('Array', array);

            if (array != undefined) {
              if (array.paused != true) {
                console.log('Hello');
                LocalNotification(array.name, array.content, array.sound);
              }
            }
          }
        }
      });
    }
  }
};

const DrawerNav = props => {
  return (
    <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
      <Drawer.Screen
        name="Notifications History"
        component={NotificationScreen}
      />
      <Drawer.Screen name="NotificationsHistory" component={Histroy} />
    </Drawer.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const channels = [
  {sound: 'alarm_frenzy'},
  {sound: 'bubbling_up'},
  {sound: 'buzzy'},

  {sound: 'capisci'},
  {sound: 'chafing'},
  {sound: 'cheerful'},
  {sound: 'check'},

  {sound: 'chimes_glassy'},
  {sound: 'closure'},
  {sound: 'coins'},
  {sound: 'consequence'},
  {sound: 'credulous'},
  {sound: 'deduction'},
  {sound: 'definite'},
  {sound: 'demonstrative'},
  {sound: 'direct'},
  {sound: 'dropped_spinner'},
  {sound: 'for_sure'},
  {sound: 'glitch'},
  {sound: 'good_morning'},
  {sound: 'happy'},
  {sound: 'hold_on'},
  {sound: 'hollow'},
  {sound: 'isnt_it'},
  {sound: 'jingle_bells'},
  {sound: 'justsaying'},
  {sound: 'nice_cut'},
  {sound: 'open_up'},
  {sound: 'oringz'},
  {sound: 'plucky'},
  {sound: 'point_blank'},
  {sound: 'serious_strike'},
  {sound: 'slow_spring_board'},
  {sound: 'siren'},
  {sound: 'shot'},
  {sound: 'system_fault'},
  {sound: 'to_the_point'},
  {sound: 'twirl'},
  {sound: 'unconvinced'},
];

for (let item of channels) {
  PushNotification.createChannel(
    {
      channelId: item.sound, // (required)
      channelName: item.sound, // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: item.sound, // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
}

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const [user, setUser] = useState();
  const handlePermission = async () => {
    /**
     * Open the notification settings so the user
     * so the user can enable it
     */
    RNAndroidNotificationListener.requestPermission();
  };
  function onAuthStateChanged(user) {
    setUser(user);
  }

  const onRemoteNotification = () => {
    PushNotificationIOS.getDeliveredNotifications(notification => {
      console.log('Notification', notification);
    });
  };

  const handleAppStateChange = async nextAppState => {
    if (nextAppState === 'active') {
      /**
       * Check the user current notification permission status
       */
      RNAndroidNotificationListener.getPermissionStatus().then(status => {
        if (status !== 'authorized') {
          handlePermission();
        }
        setHasPermission(status !== 'denied');
      });
    }
  };

  useEffect(() => {
    console.log('GGGG');
    // handlePermission();
    console.log('Hello');
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);

    if (Platform.OS === 'android') {
      AppState.addEventListener('change', handleAppStateChange);

      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const authStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />

        <Stack.Screen name="Start" component={StartScreen} />

        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: true,
            headerTintColor: '#FFF',
            title: 'Welcome',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#4299E7', elevation: 0},
          }}
        />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="Auth"
            component={authStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Notification"
            component={DrawerNav}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
