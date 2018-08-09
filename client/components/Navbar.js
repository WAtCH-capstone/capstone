// this can be deleted

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text
} from "native-base";
// import { StackNavigator, NavigationActions } from "react-navigation";

const convos = [
  {
    id: 1,
    name: "Mom",
    messages: [{ id: 1, time: "3:30pm", text: "Hello World" }]
  },
  {
    id: 2,
    name: "Jack",
    messages: [{ id: 1, time: "11:17am", text: "Dlrow Olleh" }]
  }
];

const settingsPic = {
  uri:
    "https://cdn0.iconfinder.com/data/icons/thin-essentials/57/thin-053_settings_gear_preferences-512.png"
};
const profilePic = {
  uri: "https://static.thenounproject.com/png/538846-200.png"
};
const messagesPic = {
  uri:
    "https://cdn.icon-icons.com/icons2/935/PNG/512/speech-bubble-oval-symbol-with-three-dots_icon-icons.com_73151.png"
};

class Navbar extends React.Component {
  render() {
    return (
      <Container>
        <Footer style={{ paddingTop: 15 }}>
          <FooterTab>
            <Button
              onPress={() =>
                this.props.navigation.navigate("Convos", { convos: convos })
              }
              full
            >
              <Image source={messagesPic} style={{ width: 50, height: 50 }} />
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate("Settings")}
              full
            >
              <Image source={profilePic} style={{ width: 50, height: 50 }} />
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate("Settings")}
              full
            >
              <Image source={settingsPic} style={{ width: 50, height: 50 }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    // paddingTop: 100,
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default Navbar;
