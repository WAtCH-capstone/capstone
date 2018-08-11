import React from 'react';
import { Text, View, AppState } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import db from '../../firestore';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      friend: {},
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
    this.listen = this.listen.bind(this);
  }

  getRef(id) {
    return db.collection('conversations').doc(id);
  }

  parse(message) {
    const parsed = {
      _id: new Date().getTime(),
      text: message.text,
      user: { _id: message.user },
    };
    return parsed;
  }

  async componentDidMount() {
    const ref = await this.getRef(this.props.id);
    const messages = this.props.messages.map(message => this.parse(message));
    // AppState.addEventListener('change', this.listen(ref));
    this.setState({
      ref,
      user: this.props.user,
      friend: this.props.friend,
      messages,
    });
  }

  listen(ref) {
    ref.onSnapshot(snap => {
      const parsed = snap.data().messages.map(message => this.parse(message));
      return this.setState({
        messages: [...parsed],
      });
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.listen);
  }

  onSend(messages = []) {
    console.log('messages', this.state.messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // onSend(messages = []) {
  //   console.log(messages);
  //   messages.forEach(message => {
  //     const time = new Date().getTime();
  //     const newMessages = [
  //       ...this.state.messages,
  //       {
  //         _id: message._id,
  //         text: message.text,
  //         time,
  //         user: this.state.user.uid,
  //       },
  //     ];
  //     this.state.ref.set(
  //       {
  //         messages: newMessages,
  //       },
  //       { merge: true }
  //     );
  //     this.setState({ messages: newMessages });
  //   });
  // }

  render() {
    console.log('messages', this.state.messages);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.props.user.uid,
        }}
      />
    );
  }
}

export default Messages;

// FOR GROUP CHAT NAMES
// static navigationOptions = ({ navigation }) => ({
//   title: (navigation.state.params || {}).name || "Chat!"
// });

// observeAuth = () =>
//   firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

// handleAppStateChange(appState) {
//   if (appState === 'background') {
//     console.log('app state is background. here is state', this.state);
//   }
// }
