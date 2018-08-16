import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Button as Button1 } from 'react-native';
import Navbar from './Navbar';
// import { Image, StyleSheet, View } from "react-native";
import LogIn from './LogIn';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  // Text
} from 'native-base';

const convos = [
  {
    id: 1,
    name: 'Mom',
    messages: [{ id: 1, time: '3:30pm', text: 'Hello World' }],
  },
  {
    id: 2,
    name: 'Jack',
    messages: [{ id: 1, time: '11:17am', text: 'Dlrow Olleh' }],
  },
];

export default class Home extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <LogIn navigation={this.props.navigation} />
          {/* <View style={styles.container}>
            <Text style={styles.welcome}>You're home!</Text>
          </View> */}
          {/* <View>
            <Button1
              onPress={() => this.props.navigation.navigate("LogIn")}
              title="Log in"
            />
          </View> */}
          {/* <View>
            <Button1
              onPress={() => this.props.navigation.navigate("SignUp")}
              title="Sign up"
            />
          </View> */}
          {/* <View>
            <Button1
              onPress={() => this.props.navigation.navigate("SingleConvo")}
              title="Single Conversation"
            />
          </View>
          <View>
            <Button1
              onPress={() =>
                this.props.navigation.navigate("Convos", { convos: convos })
              }
              title="Conversations"
            />
          </View>
          <View>
            <Button1
              onPress={() => this.props.navigation.navigate("Settings")}
              title="Settings"
            />
          </View> */}
        </ScrollView>
        {/* <Navbar navigation={navigation} /> */}
      </View>
    );
  }
}
