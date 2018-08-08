import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { StackNavigator } from "react-navigation";

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.button}>
      <Button
        onPress={() => navigation.navigate("SignIn")}
        title="Join Classroom"
      />
    </View>
  </View>
);

export default Home;
