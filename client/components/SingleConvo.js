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
    console.log("mounting single convo");
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
    const userImage = {
      uri:
        "https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ"
    };
    const menu = <SingleConvoPreferences navigator={navigator} />;
    if (this.state.id.length) {
      return (
        <SideMenu menu={menu} menuPosition="right" isOpen={this.state.menuOpen}>
          <View
            style={{ flex: 1, backgroundColor: "white", paddingBottom: 50 }}
          >
            <Header style={{ backgroundColor: "white", paddingTop: -20 }}>
              <Left>
                <Image source={userImage} style={styles.image} />
              </Left>
              <Body>
                <Title>{this.state.friend.displayName}</Title>
              </Body>
              <Right>
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
