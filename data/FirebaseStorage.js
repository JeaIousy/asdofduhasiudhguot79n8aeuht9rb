import firebase from 'firebase'; // 4.8.1

class FirebaseStorage {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
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
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  get ref1() {
    return firebase.database().ref('moments');
  }

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = (callback) =>
    this.ref
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = (message) => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

FirebaseStorage.shared = new FirebaseStorage();
export default FirebaseStorage;
