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
import Navbar from './Navbar';

export default class SingleConvo extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      messages: [],
      friend: {},
      menuOpen: false,
      messageContent: '',
      ref: '',
    };
    this.user = firebase.auth().currentUser;
    this.onSend = this.onSend.bind(this);
    this.listen = this.listen.bind(this);
    this.getCurrUserRef = this.getCurrUserRef.bind(this);
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
          console.log('messages: ', messages);
        }
        this.setState(prevState => ({
          messages: GiftedChat.append(prevState.messages, messages),
        }));
      });
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

  async getCurrUserRef() {
    const currUserRef = await db
      .collection('users')
      .doc(this.user.uid)
      .get();
    return currUserRef.data();
  }

  async onSend(messages = []) {
    const currUserRef = await this.getCurrUserRef();
    createdAt = new Date().getTime();
    const newMessage = {
      _id: createdAt,
      text: messages[0].text,
      createdAt,
      user: {
        _id: this.user.uid,
        name: currUserRef.displayName,
        avatar: currUserRef.icon,
      },
    };
    this.state.ref.collection('messages').add(newMessage);
    this.state.ref.set({ firstMessage: newMessage }, { merge: true });
  }

  render() {
    const menu = <SingleConvoPreferences navigator={navigator} />;
    if (this.state.id.length) {
      return (
        <SideMenu menu={menu} menuPosition="right" isOpen={this.state.menuOpen}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                  <Image
                    source={{
                      uri:
                        'https://img.freepik.com/free-icon/information-symbol_318-123095.jpg?size=338&ext=jpg',
                    }}
                    style={styles.smallImage}
                  />
                </Button>
              </Right>
            </Header>
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              user={{ _id: this.user.uid }}
              onInputTextChanged={message =>
                this.setState({ messageContent: message })
              }
            />
          </View>
          <View style={styles.scheduleButton}>
            <Button
              style={styles.blueButton}
              full
              rounded
              primary
              onPress={() => {
                this.props.navigation.navigate('MessagePreferences', {
                  user: this.user,
                  messageContent: this.state.messageContent,
                  id: this.state.id,
                });
              }}
            >
              <View>
                <Text style={{ color: 'white' }}>Schedule this Message</Text>
              </View>
            </Button>
          </View>
          <Navbar navigation={this.props.navigation} />
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
  blueButton: {
    marginTop: 5,
  },
  scheduleButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  smallImage: {
    width: 30,
    height: 30,
  },
});

// onSend(messages = []) {
//   let createdAt;
//   if (this.state.triggers.date.length) {
//     const date = new Date(this.state.triggers.date);
//     createdAt = date.getTime();
// const newMessage = {
//   _id: createdAt,
//   text: messages[0].text,
//   createdAt,
//   user: { _id: this.user.uid },
// };
//     schedule.scheduleJob(date, () => {
//       this.state.ref.collection('messages').add(newMessage);
//       this.state.ref.set({ firstMessage: newMessage }, { merge: true });
//     });
//   } else {
//     createdAt = new Date().getTime();
//     const newMessage = {
//       _id: createdAt,
//       text: messages[0].text,
//       createdAt,
//       user: { _id: this.user.uid },
//     };
//     this.state.ref.collection('messages').add(newMessage);
//     this.state.ref.set({ firstMessage: newMessage }, { merge: true });
//   }
// }
