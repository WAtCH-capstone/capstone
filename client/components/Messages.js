import React from "react";
import { Text, View, AppState } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../../firestore";
import firebase from "firebase";

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ref: "",
      messages: []
    };
    this.user = firebase.auth().currentUser;
    this.onSend = this.onSend.bind(this);
    this.listen = this.listen.bind(this);
  }

  getRef(id) {
    return db.collection("conversations").doc(id);
  }

  listen(ref) {
    ref
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(20)
      .onSnapshot(snap => {
        let messages;
        if (!this.state.messages.length) {
          messages = snap.docs.map(message => message.data());
          console.log(
            "setting state",
            GiftedChat.append(this.state.messages, messages)
          );
        } else {
          messages = snap.docs[0].data();
          console.log(
            "setting state",
            GiftedChat.append(this.state.messages, messages)
          );
        }
        this.setState(prevState => ({
          ref,
          messages: GiftedChat.append(prevState.messages, messages)
        }));
      });
  }

  async componentDidMount() {
    const ref = await this.getRef(this.props.id);
    this.listen(ref);
  }

  onSend(messages = []) {
    const createdAt = new Date().getTime();
    const newMessage = {
      _id: createdAt,
      text: messages[0].text,
      createdAt,
      user: { _id: this.user.uid }
    };
    this.state.ref.collection("messages").add(newMessage);
    this.state.ref.set({ firstMessage: newMessage }, { merge: true });
  }

  render() {
    console.log("renderrring messages", this.state.messages);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.user.uid
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
