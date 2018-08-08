import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from './Styles';

export default class Home extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.welcome}>You're home!</Text>
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('LogIn')}
            title="Log in"
          />
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="Sign up"
          />
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('SingleConvo')}
            title="Single Conversation"
          />
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('Convos')}
            title="Conversations"
          />
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('Settings')}
            title="Settings"
          />
        </View>
      </View>
    );
  }
}
