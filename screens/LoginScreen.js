import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FirebaseStorage from '../data/FirebaseStorage';
import { firebase } from '@firebase/app';
import '@firebase/auth';
var provider = new firebase.auth.GoogleAuthProvider();
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
var id;

class HomeScreen extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  onPress1 = () =>  { this.props.navigation.navigate('Home', { name: this.state.name }); }
  onPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    id = user.uid

    this.props.navigation.navigate('Call', { name: user.displayName, id: id });
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  };

  onChangeText = (name) => this.setState({ name });
  onChangeText1 = (email) => this.setState({ email });
  onChangeText2 = (password) => this.setState({ password });
  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="test@test.test"
          onChangeText={this.onChangeText1}
          value={this.state.email}
        />
        <Text style={styles.title}>Enter your password:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="password"
          onChangeText={this.onChangeText2}
          value={this.state.password}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPress1}>
          <Text style={styles.buttonText}>Register Here</Text>
        </TouchableOpacity>
      </View>
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

export default HomeScreen;
