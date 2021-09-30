import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Content, Icon} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

const Sidebar = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <TouchableOpacity>
          <View
            style={{
              height: hp('8%'),
              backgroundColor: '#4299E7',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginLeft: wp('5%'),
                fontSize: 18,
                color: '#FFF',

                marginBottom: hp('0.8%'),
              }}>
              Ssmart
            </Text>
          </View>
        </TouchableOpacity>

        <DrawerContentScrollView
          {...props}
          style={{}}
          showsVerticalScrollIndicator={false}>
          <DrawerItem
            style={{marginHorizontal: 10, paddingVertical: 10}}
            labelStyle={{color: '#333333'}}
            label="Notification Histroy"
            onPress={() => props.navigation.navigate('NotificationsHistory')}
          />
          <View style={{borderWidth: 0.5, borderColor: 'lightgrey'}}></View>
          <DrawerItem
            style={{marginHorizontal: 10, paddingVertical: 10}}
            labelStyle={{color: '#333333'}}
            label="Logout"
            onPress={async () => {
              await auth()
                .signOut()
                .then(() => {
                  props.navigation.navigate('SignIn');
                });
            }}
          />
          <View style={{borderWidth: 0.5, borderColor: 'lightgrey'}}></View>
        </DrawerContentScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Sidebar;
