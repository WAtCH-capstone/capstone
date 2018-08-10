import React from "react";
import { Text, View, AppState } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.onSend = this.onSend.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
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

  handleAppStateChange(appState) {
    if (appState === "background") {
      console.log("app state is background. here is state", this.state);
    }
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
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
