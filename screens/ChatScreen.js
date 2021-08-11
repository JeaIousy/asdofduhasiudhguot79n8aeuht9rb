import * as React from 'react';
import { View, StyleSheet, Platform, SafeAreaView, AsyncStorage, Text } from 'react-native';
import PropTypes from 'prop-types'
import { GiftedChat } from 'react-native-gifted-chat'

import FirebaseStorage from '../data/FirebaseStorage';

type Props = {
  name?: string,
};

class ChatScreen extends React.Component<Props> {
  
  state = {
    messages: [],
  };

  get user() {
    const { name, id, avatar } = this.props.route.params;
    return {
      name: name,
      _id: id,
      avatar: avatar,
    };
  }

    componentDidMount() {
      FirebaseStorage.shared.on(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );
  }
  
  componentWillUnmount() {
      FirebaseStorage.shared.off();
  }

  render() {
    return <SafeAreaView style={{flex: 1}}>
      <Text>Hi</Text>
        <GiftedChat
              messages={this.state.messages}
              onSend={FirebaseStorage.shared.send}
              user={this.user}
              alwaysShowSend
              showUserAvatar
              isAnimated
              showAvatarForEveryMessage
              renderBubble={this.renderBubble}
              renderMessageImage={() => this.showImage}
              renderUsernameOnMessage
              isTyping
        />
    </SafeAreaView>
  }
}

const styles = StyleSheet.create({
});

export default ChatScreen;
