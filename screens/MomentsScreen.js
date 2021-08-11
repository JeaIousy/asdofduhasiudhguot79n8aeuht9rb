import * as React from 'react';
import { View, StyleSheet, Platform, SafeAreaView, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types'
import { GiftedChat } from 'react-native-gifted-chat'

import FirebaseStorage from '../data/FirebaseStorage';

type Props = {
  name?: string,
};

class MomentsScreen extends React.Component<Props> {
  
  state = {
    moments: [],
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
      FirebaseStorage.shared.on(moments =>
        this.setState(previousState => ({
          moments: GiftedChat.append(previousState.moments, moments),
        }))
      );
  }
  
  componentWillUnmount() {
      FirebaseStorage.shared.off();
  }

  render() {
    return <SafeAreaView style={{flex: 1}}>
        <GiftedChat
              messages={this.state.moments}
              onSend={FirebaseStorage.shared.send1}
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

export default MomentsScreen;
