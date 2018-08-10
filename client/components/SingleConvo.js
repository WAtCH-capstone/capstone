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
    const navProps = this.props.navigation.state.params;
    this.state = {
      convo: {},
    };

    this.user = navProps.user;
    this.friend = navProps.friend;

    this.ref = navProps.ref;
  }

  componentDidMount() {
    const navProps = this.props.navigation.state.params;
    this.setState({
      convo: navProps.convo,
    });
  }

  render() {
    const userImage = {
      uri:
        'https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ',
    };
    return (
      <View style={styles.container}>
        {/* add padding, change to keyboard avoiding view*/}
        <View style={{ flex: 3, flexDirection: 'row' }}>
          <View style={{ width: 60, height: 60 }}>
            <Image source={userImage} style={styles.image} />
          </View>
          <View style={{ width: 170, height: 170 }}>
            <Text>{this.friend.name}</Text>
          </View>
          <View style={{ width: 150, height: 150 }}>
            <Button title="Preferences" />
          </View>
        </View>
        <Messages
          messages={this.state.convo.messages}
          user={this.user}
          friend={this.friend}
        />
      </View>
    );
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
