import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import Messages from './Messages';
import db from '../../firestore';

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
    };
  }

  componentDidMount() {
    const navProps = this.props.navigation.state.params;
    this.setState({
      convo: navProps.convo,
      ref: navProps.ref,
      user: navProps.user,
      friend: navProps.friend,
    });
  }

  render() {
    const userImage = {
      uri:
        'https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ',
    };
    if (this.state.convo.messages && this.state.convo.messages.length) {
      return (
        <View style={styles.container}>
          {/* add padding, change to keyboard avoiding view*/}
          <View style={{ flex: 3, flexDirection: 'row' }}>
            <View style={{ width: 60, height: 60 }}>
              <Image source={userImage} style={styles.image} />
            </View>
            <View style={{ width: 170, height: 170 }}>
              <Text>{this.state.friend.displayName}</Text>
            </View>
            <View style={{ width: 150, height: 150 }}>
              <Button title="Preferences" />
            </View>
          </View>
          <Messages
            messages={this.state.convo.messages}
            user={this.state.user}
            friend={this.state.friend}
            ref={this.state.ref}
          />
        </View>
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
    backgroundColor: 'white',
  },
  image: {
    width: 50,
    height: 50,
  },
});

// console.disableYellowBox = true;
