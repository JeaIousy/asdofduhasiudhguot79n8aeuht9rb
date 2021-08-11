import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { firebase } from '@firebase/app';
import '@firebase/auth';
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
    avatar: '',
  };

  onPress1 = () =>  { this.props.navigation.navigate('Login', { name: this.state.name }); }
  onPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        id = user.uid
        user
          .updateProfile({
            displayName: this.state.name,
            photoURL: this.state.avatar,
          })
          .then(() => {
            // Update successful
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        alert('madde');
        this.props.navigation.navigate('Chat', { name: this.state.name, id: id, avatar: this.state.avatar });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  onChangeText = (name) => this.setState({ name });
  onChangeText1 = (email) => this.setState({ email });
  onChangeText2 = (password) => this.setState({ password });
  onChangeText3 = (avatar) => this.setState({ avatar });
  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Boris Johnson"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
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
        <Text style={styles.title}>Enter avatar link:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="avatar"
          onChangeText={this.onChangeText3}
          value={this.state.avatar}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPress1}>
          <Text style={styles.buttonText}>Login Here</Text>
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
