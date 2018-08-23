import React from 'react';
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
const geodist = require('geodist');

// const convos = [
//   {
//     id: 1,
//     name: 'Mom',
//     messages: [{ id: 1, time: '3:30pm', text: 'Hello World' }],
//   },
//   {
//     id: 2,
//     name: 'Jack',
//     messages: [{ id: 1, time: '11:17am', text: 'Dlrow Olleh' }],
//   },
// ];

export default class Home extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     initialLat: null,
  //     initialLong: null,
  //     error: null,
  //     distanceLeft: '',
  //   };
  // }

  // componentDidMount() {
  //   this.watchId = navigator.geolocation.watchPosition(
  //     position => {
  //       // const initialPosition = JSON.stringify(position);
  //       this.setState(
  //         {
  //           initialLat: position.coords.latitude,
  //           initialLong: position.coords.longitude,
  //         },
  //         () => {
  //           console.log('this.state', this.state);
  //           const dist = geodist(
  //             { lat: this.state.initialLat, long: this.state.initialLong },
  //             { lat: 40.7484, long: -73.9857 },
  //             { format: true, unit: 'miles' }
  //           );
  //           console.log('distance from A to B', dist);
  //         }
  //       );
  //     },
  //     error => this.setState({ error: error.message }),
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //       maximumAge: 1000,
  //       distanceFilter: 10,
  //     }
  //   );
  // }
  // // componentWillUnmount() {
  // //   navigator.geolocation.clearWatch(this.watchId);
  // // }

  render() {
    // console.log("navigator", location);

    const navigation = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <LogIn navigation={this.props.navigation} props={this.state} />
          {/* <Test /> */}
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

console.disableYellowBox = true;
