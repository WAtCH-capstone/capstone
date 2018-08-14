import React from "react";
import { View, KeyboardAvoidingView, StyleSheet, Image } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text
} from "native-base";
import Messages from "./Messages";
import SingleConvoPreferences from "./SingleConvoPreferences";
import SideMenu from "react-native-side-menu";
import db from "../../firestore";
import Navbar from "./Navbar";
import MessagePreferences from "./MessagePreferences";

export default class SingleConvo extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      messages: [],
      friend: {},
      menuOpen: false
    };
  }

  async componentDidMount() {
    const navProps = this.props.navigation.state.params;
    const friend = navProps.friend;
    const id = navProps.id;
    let messages = await db
      .collection("conversations")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .get();
    messages = messages.docs.map(el => el.data());
    this.setState({
      id,
      messages,
      friend
    });
  }
  render() {
    const menu = <SingleConvoPreferences navigator={navigator} />;
    if (this.state.id.length) {
      return (
        <SideMenu menu={menu} menuPosition="right" isOpen={this.state.menuOpen}>
          <View style={styles.container}>
            {/* add padding, change to keyboard avoiding view*/}
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <View style={{ width: 60, height: 60 }}>
                <Image
                  source={{ uri: this.state.friend.icon }}
                  style={styles.image}
                />
              </View>
              <View style={{ width: 170, height: 170 }}>
                <Text>{this.state.friend.displayName}</Text>
              </View>
              <View style={{ width: 150, height: 150 }}>
                <Button
                  transparent
                  onPress={() => {
                    this.setState({ menuOpen: true });
                  }}
                >
                  <Text>Preferences</Text>
                </Button>
              </Right>
            </Header>
            <Messages id={this.state.id} messages={this.state.messages} />
            {/* <MessagePreferences /> */}
          </View>
          {/* <Navbar /> */}
        </SideMenu>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  image: {
    width: 50,
    height: 50
  }
});

// console.disableYellowBox = true;
