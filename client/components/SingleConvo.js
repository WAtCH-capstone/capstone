import React from "react";

import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Button
} from "react-native";
import Messages from "./Messages";
import db from "../../firestore";
import SingleConvoPreferences from "./SingleConvoPreferences";
import SideMenu from "react-native-side-menu";

export default class SingleConvo extends React.Component {
  constructor() {
    super();
    console.log(this.props);
    // const navProps = this.props.navigation.state.params;
    this.state = {
      convo: {},
      ref: {},
      user: {},
      friend: {},
      menuOpen: false
    };
  }

  componentDidMount() {
    const navProps = this.props.navigation.state.params;
    this.setState({
      id: navProps.id,
      convo: navProps.convo,
      user: navProps.user,
      friend: navProps.friend
    });
  }
  render() {
    const userImage = {
      uri:
        "https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ"
    };
    const menu = <SingleConvoPreferences navigator={navigator} />;
    if (this.state.convo.messages && this.state.convo.messages.length) {
      console.log(this.state);
      return (
        <SideMenu menu={menu} menuPosition="right" isOpen={this.state.menuOpen}>
          <View style={styles.container}>
            {/* add padding, change to keyboard avoiding view*/}
            <View style={{ flex: 3, flexDirection: "row" }}>
              <View style={{ width: 60, height: 60 }}>
                <Image source={userImage} style={styles.image} />
              </View>
              <View style={{ width: 170, height: 170 }}>
                <Text>{this.state.friend.displayName}</Text>
              </View>
              <View style={{ width: 150, height: 150 }}>
                <Button
                  title="Preferences"
                  onPress={() => {
                    this.setState({ menuOpen: true });
                  }}
                />
              </View>
            </View>
            <Messages
              id={this.state.id}
              messages={this.state.convo.messages}
              user={this.state.user}
              friend={this.state.friend}
            />
          </View>
        </SideMenu>
      );
    } else {
      return <Text>Lodeing...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "white"
  },
  image: {
    width: 50,
    height: 50
  }
});

// console.disableYellowBox = true;
