import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text } from 'native-base';
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
    const menu = <SingleConvoPreferences navigator={navigator} />;
    if (this.state.id.length) {
      return (
        <SideMenu menu={menu} menuPosition="right" isOpen={this.state.menuOpen}>
          <View
            style={{ flex: 1, backgroundColor: 'white', paddingBottom: 50 }}
          >
            <Header style={{ backgroundColor: 'white', paddingTop: -20 }}>
              <Left>
                <Image
                  source={{ uri: this.state.friend.icon }}
                  style={styles.image}
                />
              </Left>
              <Body>
                <Title>{this.state.friend.displayName}</Title>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => {
                    this.setState({ menuOpen: true });
                  }}
                >
                  <Text>Preferences</Text>
                </Button>
              </Right>
            </Header>
            <Messages id={this.state.id} messages={this.state.messages} />
          </View>
        </SideMenu>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 50,
    height: 50,
  },
});
