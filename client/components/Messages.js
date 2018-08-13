import React from "react";
import { Text, View, AppState } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../../firestore";

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      friend: {},
      messages: []
    };
    this.user = firebase.auth().currentUser;
    console.log(this.user);
    this.onSend = this.onSend.bind(this);
    this.listen = this.listen.bind(this);
  }

  getRef(id) {
    return db.collection("conversations").doc(id);
  }

  parse(message) {
    const parsed = {
      _id: message._id,
      time: message.time || new Date().getTime(),
      text: message.text,
      user: message.user
    };
    return parsed;
  }

  listen(ref) {
    ref.onSnapshot(snap => {
      const parsed = snap.data().messages.map(message => this.parse(message));
      console.log("listen is setting state as:", parsed);
      return this.setState({
        messages: [...parsed]
      });
    });
  }

  async componentDidMount() {
    console.log("MOUNTING");
    const ref = await this.getRef(this.props.id);
    const messages = this.props.messages.map(message => this.parse(message));
    console.log("component did mount is setting state with messages", messages);
    this.setState({
      ref,
      user: this.props.user,
      friend: this.props.friend,
      messages
    });
  }

  // componentWillUnmount() {
  //   AppState.removeEventListener('change', this.listen);
  // }

  onSend(messages = []) {
    console.log("onsend is being called with messages array:", messages);
    messages.forEach(message => {
      const time = new Date().getTime();
      const newMessages = [
        ...this.state.messages,
        {
          _id: message._id,
          text: message.text,
          time,
          user: { _id: this.state.user.uid }
        }
      ];
      console.log("onsend is updating firebase with messages:", newMessages);
      this.state.ref.set(
        {
          messages: newMessages
        },
        { merge: true }
      );
    });
    this.listen(this.state.ref);
  }

  render() {
    console.log("renderrring messages", this.state.messages);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.props.user.uid
        }}
      />
    );
  }
}

// export default Messages;

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

// this.setState(previousState => ({
//   messages: GiftedChat.append(previousState.messages, messages),
// }));
