import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

class MessagePreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      location: null
    };
  }

  onSubmitTime() {}

  onSubmitLocation() {}

  render() {
    return (
      <View>
        <Button style={{ margin: 10 }} bordered onPress={() => {}}>
          <Text style={{ color: "#0D91FF" }}>Triggers</Text>
        </Button>
      </View>
    );
  }
}

export default MessagePreferences;
