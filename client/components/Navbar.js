import React from "react";
import { Image, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  View
} from "native-base";

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
      <View>
        <Footer
          style={{
            backgroundColor: "white",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <FooterTab>
            <Button>
              <Image source={messagesPic} style={{ width: 50, height: 50 }} />
            </Button>
            <Button>
              <Image source={profilePic} style={{ width: 50, height: 50 }} />
            </Button>
            <Button>
              <Image source={settingsPic} style={{ width: 50, height: 50 }} />
            </Button>
          </FooterTab>
        </Footer>
      </View>

      ///FUNCTIONALITY
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default Navbar;
