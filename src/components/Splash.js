import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Start');
    }, 2500);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../Assets/logo.png')}
        resizeMode="contain"
        style={{height: 300, width: 300}}
      />
    </View>
  );
};

export default Splash;
