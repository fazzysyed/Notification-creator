import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {Badge, RadioButton} from 'react-native-paper';
import {
  Header,
  Left,
  Icon,
  Center,
  Right,
  Body,
  SwipeRow,
  Button,
} from 'native-base';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import PushNotification from 'react-native-push-notification';
import {AppRegistry} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import {LocalNotification} from './NotificationHandler';
import {set} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SoundPlayer from 'react-native-sound-player';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("TOKEN:", token);
//   },

//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);
//   //  notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },
//   onAction: function (notification) {
//     console.log("ACTION:", notification.action);
//     console.log("NOTIFICATION:", notification);

//   },
//  onRegistrationError: function(err) {
//     console.error(err.message, err);
//   },
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },
//   popInitialNotification: true,
//   requestPermissions: true,
// })

export default function NotificationScreen(props) {
  const [value, setValue] = React.useState(null);
  const [content, setContent] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const [notId, setNotId] = React.useState('');
  const [name, setName] = React.useState('');
  const [plus, setPlus] = React.useState(true);
  const [checkkk, setCheckkk] = React.useState(true);
  const [check, setCheck] = React.useState(false);
  const [selectedSound, setSelectedSound] = useState('');
  const [button, setButton] = React.useState([]);
  const [scroll, setScroll] = React.useState(false);
  const [warning, setWarning] = useState(false);
  const [sound, setSound] = React.useState([
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
  ]);
  const [visible, setVisible] = useState(false);

  const handleButtonPress = () => {
    LocalNotification();
  };

  const SaveData = () => {
    if (name.length && content.length && sound.length) {
      if (
        button.some(
          vendor => vendor['content'].toLowerCase() === content.toLowerCase(),
        )
      ) {
        setWarning(true);
      } else {
        let uid = auth().currentUser.uid;
        let notiId = Math.floor(100000 + Math.random() * 900000).toString();
        firestore()
          .collection('Notifications')
          .doc(notiId)
          .set({
            name: name,
            title: 'Notification',
            content: content,
            userId: uid,
            NotoficationId: notiId,
            sound: selectedSound,
            paused: false,
            createdAt: new Date().toUTCString(),
          })
          .then(() => {
            setPlus(false);
            setNotId(notiId);
            let uuid = auth().currentUser.uid;
            let newin = [];
            firestore()
              .collection('Notifications')

              .where('userId', '==', uuid)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                  console.log(documentSnapshot.data());
                  newin.push(documentSnapshot.data());

                  setButton(newin);
                });
                AsyncStorage.setItem('Notifications', JSON.stringify(newin));
              });
          })
          .then(() => {
            AsyncStorage.setItem('Notifications', JSON.stringify(button));

            LocalNotification(name, content, sound);
            setName('');
            setContent('');
            setSound('');
          });

        firestore().collection('Histroy').add({
          name: name,
          content: content,
          userId: uid,
          sound: selectedSound,
          createdAt: new Date().toUTCString(),
        });
      }
    }
  };

  const UpdateNotification = () => {
    let uid = auth().currentUser.uid;
    console.log(notId);
    firestore()
      .collection('Notifications')
      .doc(notId)
      .update({
        name: name,
        content: content,
        userId: uid,
        title: 'Notification',
        sound: selectedSound,
        NotoficationId: notId,
        createdAt: new Date().toUTCString(),
      })
      .then(() => {
        let uid = auth().currentUser.uid;
        firestore().collection('Histroy').add({
          name: name,
          content: content,
          userId: uid,
          sound: selectedSound,
          createdAt: new Date().toUTCString(),
        });
      })
      .then(() => {
        console.log('checkede');
        setCheck(true);
        LocalNotification(value, content);
        let newin = [];
        firestore()
          .collection('Notifications')

          .where('userId', '==', uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              console.log(documentSnapshot.data());
              newin.push(documentSnapshot.data());
              setButton(newin);
            });
          });
      });
  };

  const updateFieldChanged = text => {
    setName(text);
    setValue(text);
    console.log('index: ' + index + 'dlmc' + text);

    let newArrr = [...button]; // copying the old datas array
    newArrr[index].name = text;
    // newArr[index].content = content ;

    setButton(newArrr);
  };

  const updateFieldChangedd = text => {
    setContent(text);
    console.log('index: ' + index + 'dlmc' + text);

    let newArr = [...button]; // copying the old datas array
    newArr[index].content = text;
    // newArr[index].content = content ;

    setButton(newArr);
  };

  useEffect(() => {
    console.log(new Date().toLocaleTimeString(), 'kjskxj');
    let uuid = auth().currentUser.uid;
    let newin = [];
    firestore()
      .collection('Notifications')

      .where('userId', '==', uuid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data());
          newin.push(documentSnapshot.data());

          setButton(newin);
        });
        AsyncStorage.setItem('Notifications', JSON.stringify(newin));
      });
  }, []);

  const deleteItem = item => {
    if (button.length === 1) {
      setButton([]);
    }
    firestore()
      .collection('Notifications')
      .doc(item.NotoficationId)
      .delete()
      .then(() => {
        let uuid = auth().currentUser.uid;
        let newin = [];
        firestore()
          .collection('Notifications')

          .where('userId', '==', uuid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              console.log(documentSnapshot.data());
              newin.push(documentSnapshot.data());

              setButton(newin);
            });
            AsyncStorage.setItem('Notifications', JSON.stringify(newin));
            if (button.length === 1) {
              setButton([]);
            }
          });
      });
  };

  const pauseItem = item => {
    console.log(item, 'Cehcajahfaj');
    firestore()
      .collection('Notifications')
      .doc(item.NotoficationId)
      .update({paused: !item.paused})
      .then(() => {
        if (item.paused === false) {
          LocalNotification(
            item.content,
            'Has been paused you will not be notified',
            'alarm_frenzy',
          );
        }
        if (item.paused === true) {
          LocalNotification(
            item.content,
            'Has been resumed you will be notified',
            'alarm_frenzy',
          );
        }
      })
      .then(() => {
        let uuid = auth().currentUser.uid;
        let newin = [];

        firestore()
          .collection('Notifications')

          .where('userId', '==', uuid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              // console.log(documentSnapshot.data());
              newin.push(documentSnapshot.data());
            });

            setButton(newin);
            AsyncStorage.setItem('Notifications', JSON.stringify(newin));
          });
      });
  };
  return (
    <KeyboardAwareScrollView
      scrollEnabled={scroll}
      showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, backgroundColor: 'lightgrey'}}>
        <Header style={{backgroundColor: '#4299E7', elevation: 2}}>
          <Left style={{flex: 0.3}}>
            <Icon
              style={{color: '#FFF'}}
              name="menu"
              onPress={() => props.navigation.openDrawer()}
            />
          </Left>
          <Body style={{width: '80%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFF',
                // fontFamily: 'HKGrotesk-Regular',
              }}>
              EDIT/CREAT...
            </Text>
          </Body>
          <Right style={{flex: 0.3}}>
            <Icon
              name="plus"
              style={{color: '#FFF'}}
              type="AntDesign"
              onPress={() => {
                setPlus(true);
                setValue(null);
                setContent(null);
                setName(null);
                setSelectedSound(null);
                setNotId(null);
                setCheckkk(true);
              }}
            />
          </Right>
        </Header>

        <View style={{marginTop: 12}}>
          {button.length ? (
            <FlatList
              onTouchStart={() => setScroll(false)}
              style={{height: 200}}
              data={button}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                console.log(item, 'H');
                return (
                  <SwipeRow
                    disableRightSwipe={true}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    body={
                      <RadioButton.Group
                        onValueChange={newValue => {
                          setValue(item.name);
                          setName(item.name);
                          setContent(item.content);
                          setNotId(item.NotoficationId);
                          setPlus(false);
                          setSelectedSound(item.sound);
                          setIndex(index);
                        }}
                        value={value}>
                        <View
                          style={{
                            backgroundColor: '#FFF',
                            height: 50,
                            marginHorizontal: 10,
                            marginVertical: 2,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View>
                              <RadioButton value={item.name} color="#4299E7" />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={{width: 100}}>{item.name}</Text>
                            {value === item.name ? (
                              <Text
                                style={{
                                  width: 180,
                                  marginLeft: 5,
                                  paddingRight: 10,
                                }}>
                                {item.content}
                              </Text>
                            ) : null}
                          </View>
                        </View>
                      </RadioButton.Group>
                    }
                    right={
                      <>
                        <Button
                          badge={true}
                          style={{backgroundColor: '#4299E7'}}
                          onPress={() => pauseItem(item)}>
                          {item.paused ? (
                            <Icon
                              type="Entypo"
                              active
                              name="check"
                              style={{
                                fontSize: 12,
                                bottom: 10,
                                position: 'absolute',
                              }}
                            />
                          ) : null}
                          <Icon
                            type="FontAwesome"
                            active
                            name="hand-stop-o"
                            style={{fontSize: 27}}
                            onPress={() => pauseItem(item)}
                          />
                        </Button>
                        <Button danger onPress={() => deleteItem(item)}>
                          <Icon
                            active
                            name="trash"
                            onPress={() => deleteItem(item)}
                          />
                        </Button>
                      </>
                    }
                  />
                );
              }}
            />
          ) : null}
        </View>
        <Modal isVisible={warning} onBackdropPress={() => setWarning(false)}>
          <View
            style={{
              backgroundColor: 'white',
              // paddingVertical: 20,
              width: '85%',
              height: 300,
              alignSelf: 'center',
              // alignItems: 'center',
              // justifyContent: 'center',
              borderRadius: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  width: '90%',
                  textAlign: 'center',
                  left: 15,
                }}>
                Warning!!!
              </Text>
              <Icon
                name="circle-with-cross"
                type="Entypo"
                style={{color: '#4299E7'}}
                onPress={() => setWarning(false)}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 40,
              }}>
              <Image
                source={require('../../Assets/warning.png')}
                style={{height: 100, width: 200}}
              />
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  marginVertical: 20,
                  fontWeight: 'bold',
                }}>
                Same Notification content exist please try a different one.
              </Text>
            </View>
          </View>
        </Modal>
        <View>
          <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
            <View
              style={{
                backgroundColor: 'white',
                paddingVertical: 20,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <FlatList
                data={sound}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        paddingVertical: 15,
                        marginLeft: widthPercentageToDP('10%'),
                      }}
                      onPress={() => {
                        setSelectedSound(item.sound);
                        setVisible(false);
                      }}>
                      <Text style={{fontSize: 18}}>{item.sound}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </Modal>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginHorizontal: 10,
              marginVertical: 15,
            }}>
            Create New Notification
          </Text>
        </View>

        <View
          onTouchStart={() => setScroll(true)}
          style={{
            backgroundColor: '#FFF',
            marginHorizontal: 10,
            height: 300,
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Notification Title
          </Text>
          <TextInput
            style={{
              backgroundColor: '#EBEBEB',
              marginHorizontal: 8,
              marginVertical: 15,
              borderRadius: 5,
              height: 50,
              padding: 10,
            }}
            placeholder="Notification Name"
            placeholderTextColor="black"
            onChangeText={
              plus
                ? text => {
                    setName(text);
                    setCheckkk(false);
                  }
                : text => updateFieldChanged(text)
            }
            value={name}
          />
          <Text
            style={{marginHorizontal: 10, fontSize: 16, fontWeight: 'bold'}}>
            Notification Content
          </Text>
          <TextInput
            style={{
              backgroundColor: '#EBEBEB',
              marginHorizontal: 8,
              marginVertical: 10,
              borderRadius: 5,
              height: 50,
              padding: 10,
            }}
            onChangeText={text =>
              plus ? setContent(text) : updateFieldChangedd(text)
            }
            value={content}
            placeholder="Notification Content"
            placeholderTextColor="black"
          />

          <View>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: widthPercentageToDP('2%'),
                marginTop: heightPercentageToDP('3%'),
              }}>
              <Icon
                style={{color: '#4299E7'}}
                name="cloudupload"
                type="AntDesign"
              />
              <Text style={{paddingLeft: 5, color: '#4299E7'}}>
                Select Sound
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginLeft: widthPercentageToDP('2%'),
                flexDirection: 'row',
                marginTop: 8,
              }}>
              <Text style={{fontWeight: 'bold'}}>SelectedSound : </Text>
              <Text style={{paddingLeft: 20}}>{selectedSound}</Text>
            </View>
          </View>
        </View>
        {plus ? (
          <TouchableOpacity
            disabled={checkkk}
            onPress={() => SaveData()}
            style={{
              backgroundColor: '#4299E7',
              height: 40,
              marginTop: 10,
              marginBottom: heightPercentageToDP('10%'),
              // marginVertical: 30,
              marginHorizontal: 30,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#FFF'}}>Save/Edit Notifications</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => UpdateNotification()}
            style={{
              backgroundColor: '#4299E7',
              height: 35,
              marginTop: 10,
              marginBottom: heightPercentageToDP('10%'),
              // marginVertical: 30,
              marginHorizontal: 30,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#FFF'}}>Save/Edit Notifications</Text>
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity style={{alignSelf:'center', marginBottom:80}} onPress={()=> handleButtonPress()}>
          <Text>Testing Notification</Text>
      </TouchableOpacity> */}
      </View>
    </KeyboardAwareScrollView>
  );
}
