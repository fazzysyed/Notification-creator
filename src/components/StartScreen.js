import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import {LocalNotification} from './NotificationHandler';

const entries = [
  {
    id: 1,
    image: require('../../Assets/iimg1.jpg'),
  },
  {
    id: 2,
    image: require('../../Assets/iimg2.jpg'),
  },
  {
    id: 3,
    image: require('../../Assets/iimg3.jpg'),
  },
  {
    id: 4,
    image: require('../../Assets/iimg4.jpg'),
  },
  {
    id: 5,
    image: require('../../Assets/iimg5.jpg'),
  },
  {
    id: 6,
    image: require('../../Assets/iimg6.jpg'),
  },
  {
    id: 7,
    image: require('../../Assets/iimg7.jpg'),
  },
  {
    id: 8,
    image: require('../../Assets/iimg8.jpg'),
  },
];
const StartScreen = ({navigation}) => {
  const {width: viewportWidth} = Dimensions.get('window');

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          style={{
            height: hp('60%'),
            width: '100%',
            borderRadius: 5,
            // resizeMode: 'contain',
          }}
          source={item.image}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginTop: hp('3%'),
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 27}}>Welcome !</Text>
        <Text
          style={{textAlign: 'center', marginTop: hp('2%'), width: wp('50%')}}>
          Look deep into nature, and then you will understand everything better.
        </Text>
      </View>
      <View style={{marginTop: hp('4%')}}>
        <Carousel
          loop={true}
          autoplay={true}
          layout={'default'}
          activeSlideAlignment="center"
          data={entries}
          inactiveSlideScale={0.79}
          sliderWidth={viewportWidth}
          itemWidth={280}
          renderItem={renderItem}
        />
      </View>
      <View style={{marginTop: hp('8%')}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          // onPress={() => LocalNotification('Hello', 'Hi', 'channel-id-shot')}
          style={{
            backgroundColor: '#4299E7',
            height: 40,
            width: wp('85%'),
            alignSelf: 'center',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#FFF'}}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartScreen;
