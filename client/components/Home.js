import React, { Component } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import styles from "./Styles";
import Navbar from "./Navbar";

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

export default class Home extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.welcome}>You're home!</Text>
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("LogIn")}
              title="Log in"
            />
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("SignUp")}
              title="Sign up"
            />
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("SingleConvo")}
              title="Single Conversation"
            />
          </View>
          <View>
            <Button
              onPress={() =>
                this.props.navigation.navigate("Convos", { convos: convos })
              }
              title="Conversations"
            />
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("Settings")}
              title="Settings"
            />
          </View>
        </ScrollView>
        <Navbar />
      </View>
    );
  }
}
