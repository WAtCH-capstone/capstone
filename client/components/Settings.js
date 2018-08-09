import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class Settings extends Component {
  test() {
    console.log('hi');
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <Text>Settings goes here</Text>
        <Button onPress={() => this.test()} title="test" />
      </View>
    );
  }
}
