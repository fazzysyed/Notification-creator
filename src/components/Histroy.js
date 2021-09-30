import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import {widthPercentageToDP as wp,heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Header, Left, Icon, Center, Right, Body, Card} from 'native-base';

const Histroy = (props) => {
    const [histroy, setHistroy]= useState([]);
    useEffect(() => {
        let uuid = auth().currentUser.uid;
        let newin=[];
            firestore()
              .collection('Histroy')
              .where('userId', '==', uuid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((documentSnapshot) => {
                    console.log(documentSnapshot.data());
                     newin.push(documentSnapshot.data());
                     setHistroy(newin);
                });
              });
      }, []);
    return (
        <View>
            <Header style={{backgroundColor: '#4299E7', elevation: 0}}>
                <Left style={{flex: 0.3}}>
                    <Icon style={{color:'#FFF'}} name="arrow-back" type="Ionicons" onPress={()=>props.navigation.goBack()} />
                </Left>
                <Body style={{width: '80%', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color:'#FFF', fontFamily: 'HKGrotesk-Regular'}}>
                        NOTIFICATION HISTROY
                    </Text>
                </Body>
                <Right style={{flex: 0.3}}>    
                </Right>
            </Header>

            <ScrollView>
                <FlatList
                    data={histroy}
                    renderItem={({item, index}) => {
                        return(
                        <Card style={{padding:15, width:wp('98%'), alignSelf:'center', borderRadius:5}}>
                                            <View style={{paddingBottom:8}}>
                                                <Text style={{fontSize:17}}>
                                                    Notification Name: "{item.name}"
                                                </Text>
                                            </View>
                                            <View style={{paddingBottom:8}}>
                                                <Text style={{fontSize:17}}>
                                                    Notification Content: "{item.content}""
                                                </Text>
                                            </View>
                                            <View style={{paddingBottom:8}}>
                                                <Text style={{fontSize:17}}>
                                                    Notification Sound: "{item.sound}"
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{fontSize:17}}>
                                                    CreatedAt: "{item.createdAt}"
                                                </Text>
                                            </View>
                                        </Card>
                        )
                    }}
                />
                
            </ScrollView>
        </View>
    )
}

export default Histroy
