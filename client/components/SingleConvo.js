import React from "react";
import {
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Image
} from "react-native";
import Messages from "./Messages";

class SingleConvo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userImage = {
      uri:
        "https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ"
    };
    return (
      <View style={styles.container}>
        {/* add padding, change to keyboard avoiding view*/}
        <View style={{ flex: 3, flexDirection: "row" }}>
          <View style={{ width: 60, height: 60 }}>
            <Image source={userImage} style={styles.image} />
          </View>
          <View style={{ width: 170, height: 170 }}>
            <Text>NAME GOES HERE</Text>
          </View>
          <View style={{ width: 150, height: 150 }}>
            <Button title="Preferences" />
          </View>
        </View>
        <Messages />
      </View>
    );
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

export default SingleConvo;
