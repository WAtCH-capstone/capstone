import React from 'react';
import { Text, View, AppState } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      friend: {},
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    // this.observeAuth()
  }

  parse(message) {
    let user;
    if (message.sender === this.props.user.id) {
      user = this.props.user;
    } else {
      user = this.props.friend;
    }
    const timestamp = new Date(message.time);
    const parsed = {
      timestamp,
      text: message.text,
      user,
    };
    return parsed;
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    const parsedArr = this.props.messages.map(message => this.parse(message));
    this.setState({
      user: this.props.user,
      friend: this.props.friend,
      messages: parsedArr,
    });
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      console.log('app state is background. here is state', this.state);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onSend(messages = []) {
    const now = new Date().getTime();
  }
  // FOR GROUP CHAT NAMES
  // static navigationOptions = ({ navigation }) => ({
  //   title: (navigation.state.params || {}).name || "Chat!"
  // });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default Messages;
