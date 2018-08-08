import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./Styles";

export default class Home extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>You're home!</Text>
      </View>
    );
  }
}
