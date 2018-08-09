// this can be deleted

import React from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text
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
    "https://mash.ie/wp-content/uploads/2017/09/4-2-speech-bubble-png-images-800x800.png"
};

class Navbar extends React.Component {
  // <View>
  //   <Text>Navbar goes here</Text>
  // </View>
  render() {
    return (
      <Container>
        <Header />
        <Content />
        <Footer>
          <FooterTab>
            {/* <Button full>
              <Text>Footer</Text>
            </Button> */}
            <Button full>
              <Image source={messagesPic} style={{ width: 80, height: 60 }} />
            </Button>
            <Button full>
              <Image source={profilePic} style={{ width: 60, height: 60 }} />
            </Button>
            <Button full>
              <Image source={settingsPic} style={{ width: 60, height: 60 }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

// const styles = StyleSheet

export default Navbar;
