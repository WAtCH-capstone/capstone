import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import db from '../../firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import Navbar from './Navbar';
import SideMenu from 'react-native-side-menu';
import schedule from 'node-schedule';
import geodist from 'geodist';
import key from '../../googleMaps';
import TranslateComponent from './Translate';
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from 'react-native-power-translator';

export default class SingleConvo extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      messages: [],
      friends: {},
      menuOpen: false,
      messageContent: '',
      ref: '',
      friendPrefs: [],
      locationPrefs: null,
    };
    this.user = firebase.auth().currentUser;
    this.onSend = this.onSend.bind(this);
    this.listen = this.listen.bind(this);
    this.setConvoPrefs = this.setConvoPrefs.bind(this);
    this.getCurrUserRef = this.getCurrUserRef.bind(this);
  }

  getRef(id) {
    return db.collection('conversations').doc(id);
  }

  listen() {
    const convoID = this.props.navigation.state.params.id;
    const listenToMessages = db
      .collection('conversations')
      .doc(convoID)
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

    this.unsubscribeMessages = listenToMessages;

    const listenToPendingLocation = db
      .collection('conversations')
      .doc(convoID)
      .collection('location-check')
      .onSnapshot(snap => {
        const pendingMessages = snap.docs.map(doc => doc.data());
        console.log('checking:', pendingMessages);
        if (!this.state.locationPrefs) {
          for (let message of pendingMessages) {
            if (message.counter === this.state.friends.length) {
              db.collection('converstions')
                .doc(convoID)
                .collection('messages')
                .add(message.newMessage);
              db.collection('conversations')
                .doc(convoID)
                .collection('location-check')
                .doc(message.newMessage.createdAt.toString())
                .delete();
            } else {
              db.collection('conversations')
                .doc(convoID)
                .collection('location-check')
                .doc(message.newMessage.createdAt.toString())
                .set({ counter: message.counter++ }, { merge: true });
            }
          }
        } else {
          for (let message of pendingMessages) {
            const currLocation = navigator.geolocation.getCurrentPosition(
              position => ({
                longitude: position.longitude,
                latitude: position.latitude,
              })
            );
            const distance = geodist(
              { lat: currLocation.latitude, long: currPosition.longitude },
              {
                lat: this.state.locationPrefs.latitude,
                long: this.state.locationPrefs.longitude,
              },
              { unit: 'feet' }
            );
          }
          if (distance < 502) {
            if (message.counter === this.state.friends.length) {
              db.collection('conversations')
                .doc(convoID)
                .collection('messages')
                .add(message.newMessage);
              db.collection('conversations')
                .doc(convoID)
                .collection('location-check')
                .doc(message.newMessage.createdAt.toString())
                .delete();
            } else {
              db.collection('conversations')
                .doc(convoID)
                .collection('location-check')
                .doc(message.newMessage.createdAt.toString())
                .set({ counter: message.counter++ }, { merge: true });
            }
          } else {
            console.log('outside of range!');
            // re-check
          }
        }
      });
    this.unsubscribePendingLocation = listenToPendingLocation;
  }

  componentDidMount() {
    this.listen();
    const friends = this.props.navigation.state.params.friends;
    const ref = this.getRef(this.props.navigation.state.params.id);
    let doNotDisturbArr = [];
    let locationPrefs = null;
    if (friends.length === 1) {
      const friendPrefsArr = this.props.navigation.state.params.friendPrefs;
      if (friendPrefsArr && friendPrefsArr[0]) {
        const friendPrefs = friendPrefsArr[0];
        for (let i = 0; i < friendPrefs.startTimes.length; i++) {
          const start = timeToInt(friendPrefs.startTimes[i].time);
          const end = timeToInt(friendPrefs.endTimes[i].time);
          doNotDisturbArr.push([start, end]);
        }
      }
      const userPrefs = this.props.navigation.state.params.userPrefs;
      if (userPrefs && userPrefs.location) {
        locationPrefs = userPrefs.location;
      }
    }
    this.setState({
      friends,
      id: this.props.navigation.state.params.id,
      ref,
      friendPrefs: doNotDisturbArr,
      locationPrefs,
    });
  }

  async getCurrUserRef() {
    const currUserRef = await db
      .collection('users')
      .doc(this.user.uid)
      .get();
    return currUserRef.data();
  }

  async onSend(messages = []) {
    let done;
    const currUserRef = await this.getCurrUserRef();
    const createdAt = new Date().getTime();
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
    const timeToCheck = dateToInt(new Date());
    this.state.friendPrefs.forEach(pref => {
      if (timeToCheck > pref[0] && timeToCheck < pref[1]) {
        db.collection('users')
          .doc(this.user.uid)
          .collection('scheduled')
          .doc(createdAt.toString())
          .set({ newMessage, convoID: this.props.navigation.state.params.id });
        const date = new Date(setSendTime(createdAt, pref[1] - timeToCheck));
        alert(
          'Your friend is in DO NOT DISTURB mode. You message has been scheduled.'
        );
        schedule.scheduleJob(date, () => {
          this.state.ref
            .collection('location-check')
            .doc(createdAt.toString())
            .set({ newMessage, counter: 0 });
          this.state.ref.set({ firstMessage: newMessage }, { merge: true });
          db.collection('users')
            .doc(this.user.uid)
            .collection('scheduled')
            .doc(createdAt.toString())
            .delete();
        });
        done = true;
      }
    });
    if (!done) {
      this.state.ref
        .collection('location-check')
        .doc(createdAt.toString())
        .set({ newMessage, counter: 0 });
      this.state.ref.set({ firstMessage: newMessage }, { merge: true });
    }
  }

  async setConvoPrefs(prefs) {
    let objToSet = {};
    const key = `${this.user.uid}-prefs`;
    objToSet[key] = prefs;
    await db
      .collection('conversations')
      .doc(this.state.id)
      .set(objToSet, { merge: true });
  }

  async translateMessage(messageContent, lang) {
    TranslatorConfiguration.setConfig(ProviderTypes.Google, key, lang);
    const translator = TranslatorFactory.createTranslator();
    await translator.translate(messageContent).then(translated => {
      this.setState({ messageContent: translated });
    });
  }

  renderHeader() {
    if (this.state.friends.length === 1) {
      const friend = this.state.friends[0];
      return (
        <React.Fragment>
          <Left>
            <Image source={{ uri: friend.icon }} style={styles.image} />
          </Left>
          <Body>
            <Title>{friend.displayName}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('SingleConvoPreferences', {
                  setConvoPrefs: this.setConvoPrefs,
                  id: this.state.id,
                  friend,
                })
              }
            >
              <Image
                source={require('../../public/buttons/preferences.png')}
                style={styles.smallImage}
              />
            </Button>
          </Right>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Body>
            <Title>Group Chat</Title>
          </Body>
        </React.Fragment>
      );
    }
  }

  render() {
    if (this.state.id.length) {
      return (
        <SideMenu>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header style={{ backgroundColor: 'white', paddingTop: -20 }}>
              {this.renderHeader()}
            </Header>
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              user={{ _id: this.user.uid }}
              onInputTextChanged={message =>
                this.setState({ messageContent: message })
              }
              text={this.state.messageContent}
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
          <TranslateComponent
            messageContent={this.state.messageContent}
            translateMessage={this.translateMessage.bind(this)}
          />
          <Navbar navigation={this.props.navigation} />
        </SideMenu>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

timeToInt = time => {
  const arr1 = time.split(':');
  const arr2 = arr1[1].split(' ');
  let hours;
  if (arr2[1] === 'am') {
    hours = parseInt(arr1[0]);
  } else {
    hours = parseInt(arr1[0]) + 12;
  }
  let mins = parseInt(arr2[0]);
  return hours * 60 + mins;
};

dateToInt = date => {
  let dateArr = date.toString().split(' ');
  let [hour, minute, second] = dateArr[4].split(':').map(str => parseInt(str));
  return hour * 60 + minute;
};

setSendTime = (creationTime, minutesUntilSend) => {
  const millisecondsUntilSend = minutesUntilSend * 60000;
  return creationTime + millisecondsUntilSend;
};

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
    paddingBottom: 10,
  },
  smallImage: {
    width: 30,
    height: 30,
  },
});
