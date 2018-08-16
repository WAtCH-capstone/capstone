import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import SingleConvoPreferences from './SingleConvoPreferences';
import SideMenu from 'react-native-side-menu';
import db from '../../firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import MessagePreferences from './MessagePreferences';
import schedule from 'node-schedule';

export default class SingleConvo extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      messages: [],
      friend: {},
      menuOpen: false,
      triggers: {
        date: '',
      },
    };
    this.user = firebase.auth().currentUser;
    this.onSend = this.onSend.bind(this);
    this.listen = this.listen.bind(this);
    this.setTrigger = this.setTrigger.bind(this);
  }

  getRef(id) {
    return db.collection('conversations').doc(id);
  }

  listen() {
    this.unsubscribe = db
      .collection('conversations')
      .doc(this.props.navigation.state.params.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .onSnapshot(snap => {
        let messages;
        if (!this.state.messages.length) {
          messages = snap.docs.map(message => message.data());
        } else {
          messages = snap.docs[0].data();
        }
        this.setState(prevState => ({
          messages: GiftedChat.append(prevState.messages, messages),
        }));
      });
  }

  setTrigger(date) {
    console.log('setting trigger in SingleConvo with', date);
    this.setState({ triggers: { date } });
  }

  componentDidMount() {
    this.listen();
    const ref = this.getRef(this.props.navigation.state.params.id);
    this.setState({
      friend: this.props.navigation.state.params.friend,
      id: this.props.navigation.state.params.id,
      ref,
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSend(messages = []) {
    console.log(this.state.triggers);
    if (this.state.triggers.date) {
      console.log('date', this.state.triggers.date);
      const date = new Date(2018, 7, 16, 12, 18, 0);
      schedule.scheduleJob(date, () =>
        db
          .collection('conversations')
          .doc('856OQe9Vin9Br9fXoo9q')
          .collection('messages')
          .add({ text: 'test trigger' })
      );
    } else {
      const createdAt = new Date().getTime();
      const newMessage = {
        _id: createdAt,
        text: messages[0].text,
        createdAt,
        user: { _id: this.user.uid },
      };
      this.state.ref.collection('messages').add(newMessage);
      this.state.ref.set({ firstMessage: newMessage }, { merge: true });
    }
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
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              user={{
                _id: this.user.uid,
              }}
            />
          </View>
          <MessagePreferences setTrigger={this.setTrigger} />
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
