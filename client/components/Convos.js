import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Header,
  Item,
  Input,
  Button,
} from 'native-base';
import { ActivityIndicator, Image } from 'react-native';
import db from '../../firestore';
import firebase from 'firebase';
import Navbar from './Navbar';
import styles from './Styles';
import Notification from 'react-native-in-app-notification';

export default class Convos extends Component {
  constructor() {
    super();
    this.state = { convos: [], search: '', results: [], isLoading: true };
    this.user = firebase.auth().currentUser;
    this.getUserData = this.getUserData.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
    this.getData = this.getData.bind(this);
    this.renderConvos = this.renderConvos.bind(this);
    this.listenToConvos = this.listenToConvos.bind(this);
    this.listenToUser = this.listenToUser.bind(this);
    this.setConvos = this.setConvos.bind(this);
  }

  async listenToConvos() {
    let userData = await this.getUserData();
    for (let id of userData.conversations) {
      this.unsubscribe = await db
        .collection('conversations')
        .doc(id)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .onSnapshot(async () => {
          let userData = await this.getUserData();
          this.setConvos(userData);
        });
    }
  }

  async listenToUser() {
    this.userListener = await db
      .collection('users')
      .doc(this.user.uid)
      .onSnapshot(snap => {
        this.setConvos(snap.data());
      });
  }

  async setConvos(userData) {
    let convosArr = [];
    for (let id of userData.conversations) {
      const convoData = await this.getData(id);
      const firstMessage = convoData.firstMessage;
      const friend = convoData.friend;
      convosArr.push({
        id,
        firstMessage,
        friend,
      });
    }
    this.setState({ convos: convosArr, isLoading: false });
  }

  async componentDidMount() {
    this.listenToConvos();
    this.listenToUser();
  }

  // async listenNotifications() {
  //   const uid = await firebase.auth().currentUser.uid;
  //   const snapshot = await db
  //     .collection('users')
  //     .doc(uid)
  //     .get();
  //   const userData = await snapshot.data();
  //   let userConvos = [];
  //   for (let id of userData.conversations) {
  //     const convoData = await this.getData(id);
  //     userConvos.push(convoData);
  //   }
  //   console.log('userConvos: ', userConvos);
  //   userConvos.forEach(convo => {
  //     this.unsubscribe = db
  //       .collection('conversations')
  //       .doc(convo._id)
  //       .collection('messages')
  //       .onSnapshot(snap => {
  //         console.log('snap: ', snap);
  //         // this.notification &&
  //         //   this.notification.show({
  //         //     title: 'You pressed it!',
  //         //     message: 'The notification has been triggered',
  //         //     // onPress: () =>
  //         //     //   Alert.alert('Alert', 'You clicked the notification!'),
  //         //   });
  //       });
  //   });
  // }

  enterSearch(search) {
    let convos = this.state.convos;
    let searchResult = [];
    if (!search.length) {
      this.setState({ results: convos });
    }
    for (let i = 0; i < convos.length; i++) {
      if (search === convos[i].friend.displayName) {
        searchResult.push(convos[i]);
      }
      this.setState({ results: searchResult, isLoading: false });
    }
  }

  renderConvos(convos) {
    return convos.map(convoData => {
      if (convoData.firstMessage) {
        const id = convoData.id;
        const friend = convoData.friend;
        const firstMessage = convoData.firstMessage;
        const date = new Date(firstMessage.createdAt);
        const time = this.dateToTime(date);
        const timeArr = date.toString().split(' ');
        const displayTime =
          timeArr[0] + ' ' + timeArr[1] + ' ' + timeArr[2] + ' at ' + time;
        return (
          <ListItem
            key={id}
            avatar
            onPress={() =>
              this.props.navigation.navigate('SingleConvo', {
                id,
                friend,
              })
            }
          >
            <Left>
              <Thumbnail source={{ uri: friend.icon }} />
            </Left>
            <Body>
              <Text>{friend.displayName}</Text>
              <Text note>{firstMessage && firstMessage.text}</Text>
            </Body>
            <Right>
              <Text note>{displayTime}</Text>
            </Right>
          </ListItem>
        );
      }
    });
  }

  render() {
    const convos = this.state.convos;
    const results = this.state.results;
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header style={styles.header} searchBar rounded>
          <Item>
            <Input
              clearButtonMode="always"
              onChangeText={search => this.setState({ search })}
              placeholder="Search"
            />
          </Item>
          <Button
            transparent
            onPress={() => this.enterSearch(this.state.search)}
          >
            <Text>Search</Text>
          </Button>
          <Button
            transparent
            onPress={() => navigation.navigate('CreateConvo')}
          >
            <Text>+</Text>
          </Button>
        </Header>
        <Content>
          {results && results.length ? (
            <List>{this.renderConvos(results)}</List>
          ) : convos && convos.length ? (
            <List>{this.renderConvos(convos)}</List>
          ) : this.state.isLoading ? (
            <ActivityIndicator size="large" color="#3B80FE" />
          ) : (
            <Container style={styles.noneContainer}>
              <Image source={require('../../public/no-messages.png')} />
              <Text style={styles.none}>No conversations yet</Text>
            </Container>
          )}
        </Content>
        <Navbar navigation={this.props.navigation} />
        {/* <Notification
          ref={ref => {
            this.notification = ref;
          }}
        /> */}
      </Container>
    );
  }

  async getUserData() {
    const snapshot = await db
      .collection('users')
      .doc(this.user.uid)
      .get();
    return snapshot.data();
  }

  async getData(id) {
    const convo = await db
      .collection('conversations')
      .doc(id)
      .get();
    const data = convo.data();
    const firstMessage = data.firstMessage;
    const friendID = data.users.find(uid => uid !== this.user.uid);
    const friendQuery = await db
      .collection('users')
      .doc(friendID)
      .get();
    const friend = friendQuery.data();
    return { firstMessage, friend };
  }

  dateToTime(date) {
    let dateArr = date.toString().split(' ');
    let [hour, minute, second] = dateArr[4]
      .split(':')
      .map(str => parseInt(str));
    if (hour > 12) {
      hour = hour - 12;
      if (minute < 10) return `${hour}:0${minute} pm`;
      else return `${hour}:${minute} pm`;
    } else {
      if (minute < 10) return `${hour}:0${minute} am`;
      else return `${hour}:${minute} am`;
    }
  }
}
