/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {useWindowDimensions, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Input from './Input';
import {validateEmail} from './helper/Validator';

const FirstRoute = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const Login = () => {
    if (email.length && validateEmail(email) && password.length) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          setPassword('');
          setEmail('');
          navigation.navigate('Notification');
        })
        .catch(error => {
          setPasswordError('Password is incorrect');
        });
    }
  };

  useEffect(() => {
    const updateEmailErrMessage = async () => {
      if (email.length && !validateEmail(email)) {
        setEmailError('Please enter valid email ');
        return null;
      }

      setEmailError('');
      return null;
    };
    updateEmailErrMessage();
  }, [email]);

  useEffect(() => {
    const updatePasswordErrMessage = async () => {
      if (password.length && password.length <= 6) {
        setPasswordError('Password must be 6 characters long ');
        return null;
      }
      setPasswordError('');
      return null;
    };
    updatePasswordErrMessage();
  }, [password]);

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Input
        placeholder="Email"
        value={email}
        handler={text => {
          setEmail(text);
        }}
        keyType="email-address"
        errorMessage={emailError}
      />
      <Input
        secure={true}
        placeholder="Password"
        value={password}
        handler={text => {
          setPassword(text);
        }}
        errorMessage={passwordError}
      />
      <TouchableOpacity
        onPress={() => Login()}
        style={{
          backgroundColor: '#4299E7',
          height: 40,
          marginVertical: 30,
          marginHorizontal: 30,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {loading ? (
          <ActivityIndicator size={24} color="white" />
        ) : (
          <Text style={{color: '#FFF'}}>Sign In</Text>
        )}
        {/* <Text style={{color: '#FFF'}}>Sign In</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const SecondRoute = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const Register = () => {
    if (email.length && validateEmail(email) && password.length) {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          setPassword('');
          setEmail('');
          navigation.navigate('Notification');
        });
    }
  };

  useEffect(() => {
    const updateEmailErrMessage = async () => {
      if (email.length && !validateEmail(email)) {
        setEmailError('Please enter valid email ');
        return null;
      }

      setEmailError('');
      return null;
    };
    updateEmailErrMessage();
  }, [email]);

  useEffect(() => {
    const updatePasswordErrMessage = async () => {
      if (password.length && password.length <= 6) {
        setPasswordError('Password must be 6 characters long ');
        return null;
      }
      setPasswordError('');
      return null;
    };
    updatePasswordErrMessage();
  }, [password]);
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <TextInput
        style={{
          backgroundColor: '#EBEBEB',
          marginHorizontal: 15,
          marginVertical: 13,
          borderRadius: 5,
          height: 50,
          padding: 5,
        }}
        onChangeText={text => setUsername(text)}
        placeholder="Username"
        placeholderTextColor="black"
      />
      <Input
        placeholder="Email"
        value={email}
        handler={text => {
          setEmail(text);
        }}
        keyType="email-address"
        errorMessage={emailError}
      />
      <Input
        secure={true}
        placeholder="Password"
        value={password}
        handler={text => {
          setPassword(text);
        }}
        errorMessage={passwordError}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#4299E7',
          height: 40,
          marginVertical: 30,
          marginHorizontal: 30,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => Register()}>
        {loading ? (
          <ActivityIndicator size={24} color="white" />
        ) : (
          <Text style={{color: '#FFF'}}>Sign Up</Text>
        )}
        {/* <Text style={{color: '#FFF'}}>Sign Up</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const SignIn = props => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Sign In'},
    {key: 'second', title: 'Sign Up'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: '#FFF'}}
            activeColor="#FFF"
            inactiveColor="#EBEBEB"
            style={{backgroundColor: '#4299E7'}}
          />
        )}
        initialLayout={{
          width: Dimensions.get('window').width,
        }}
      />
    </View>
  );
};
export default SignIn;
