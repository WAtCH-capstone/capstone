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
import SingleConvoPreferences from './SingleConvoPreferences';
import SideMenu from 'react-native-side-menu';
import db from '../../firestore';

export default class SingleConvo extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      messages: [],
      friend: {},
      menuOpen: false,
    };
  }

  async componentDidMount() {
    const navProps = this.props.navigation.state.params;
    const friend = navProps.friend;
    const id = navProps.id;
    let messages = await db
      .collection('conversations')
      .doc(id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    messages = messages.docs.map(el => el.data());
    this.setState({
      id,
      messages,
      friend,
    });
  }
  render() {
    const userImage = {
      uri:
        'https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ',
    };
    const menu = <SingleConvoPreferences navigator={navigator} />;
    if (this.state.id.length) {
      return (
        <SideMenu menu={menu} menuPosition="right" isOpen={this.state.menuOpen}>
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
                <Button
                  title="Preferences"
                  onPress={() => {
                    this.setState({ menuOpen: true });
                  }}
                />
              </View>
            </View>
            <Messages id={this.state.id} messages={this.state.messages} />
          </View>
        </SideMenu>
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
