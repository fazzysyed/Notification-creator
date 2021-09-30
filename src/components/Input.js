import React from 'react';
import {Text, View, TextInput} from 'react-native';

const Input = ({
  placeholder,
  handler,
  value,
  errorMessage,
  keyType,
  secure,
}) => (
  <View
    style={{
      backgroundColor: '#EBEBEB',

      marginHorizontal: 15,
      borderRadius: 5,
      height: errorMessage.length ? 80 : 50,
      padding: 5,
      marginTop: 13,
    }}>
    <TextInput
      style={{fontSize: 16}}
      onChangeText={text => handler(text)}
      placeholder={placeholder}
      value={value}
      keyboardType={keyType}
      secureTextEntry={secure}
      placeholderTextColor="black"
    />
    {errorMessage.length ? (
      <Text
        style={{
          marginHorizontal: 5,
          fontSize: 12,
          // marginBottom: 4,
          color: 'red',
        }}>
        {errorMessage}
      </Text>
    ) : null}
  </View>
);

export default Input;
