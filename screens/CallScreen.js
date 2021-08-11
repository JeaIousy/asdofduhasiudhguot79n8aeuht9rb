import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import FirebaseStorage from '../data/FirebaseStorage';
import * as Permissions from 'expo-permissions';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { WebView } from 'react-native-webview'
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyBCIFYtQkbcDSeECRQeroJRX84zPhFKtLk',
        authDomain: 'chat-dc01f.firebaseapp.com',
        databaseURL: 'https://chat-dc01f-default-rtdb.firebaseio.com',
        projectId: 'chat-dc01f',
        storageBucket: 'chat-dc01f.appspot.com',
        messagingSenderId: '998749021271',
        appId: '1:998749021271:web:3ea0491f57a91849496f12',
        measurementId: 'G-P3Z88ZP908',
      });
    }
class CallScreen extends React.Component {
  
  async componentDidMount() {
    await Camera.requestPermissionsAsync();
    await Audio.requestPermissionsAsync()
    }
    
      render() {
    return (
      <WebView
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        source={{ uri: 'https://aaosdughaisduohghgaoisdghgiojg.herokuapp.com/' }}
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: 'red',
          width: 400,
          height: 400,
        }}
        originWhitelist={['*']}
        allowsInlineMediaPlayback
        javaScriptEnabled
        scalesPageToFit
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState
        javaScriptEnabledAndroid
        useWebkit
      />
    );
      }
}

const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default CallScreen;
