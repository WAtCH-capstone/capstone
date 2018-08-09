import React from "react";
import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.onSend = this.onSend.bind(this);
    // this.observeAuth()
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
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
          _id: 1
        }}
      />
    );
  }
}

export default Messages;
