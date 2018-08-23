import React from 'react';
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

export default class Convos extends React.Component {
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
      convosArr.push({
        id,
        firstMessage: convoData.firstMessage,
        friends: convoData.friends,
        friendPrefs: convoData.friendPrefs,
        userPrefs: convoData.userPrefs,
      });
    }
    this.setState({ convos: convosArr, isLoading: false });
  }

  async componentDidMount() {
    this.listenToConvos();
    this.listenToUser();
  }

  enterSearch(search) {
    let convos = this.state.convos;
    let searchResult = [];
    if (!search.length) {
      this.setState({ results: convos, isLoading: false });
      return;
    }
    for (let i = 0; i < convos.length; i++) {
      let friends = convos[i].friends;
      for (let friend of friends) {
        if (search === friend.displayName) {
          searchResult.push(convos[i]);
          break;
        }
      }
      this.setState({ results: searchResult, isLoading: false });
    }
  }

  renderNames(friends) {
    const names = friends.map(el => el.displayName);
    return names.join(' & ');
  }

  renderThumbnail(friends, firstMessage) {
    if (friends.length === 1) {
      return <Thumbnail source={{ uri: friends[0].icon }} />;
    } else {
      return <Thumbnail source={{ uri: firstMessage.user.avatar }} />;
    }
  }

  sortConvos(convos) {
    return convos.sort((first, second) => {
      if (first.firstMessage && second.firstMessage) {
        return second.firstMessage.createdAt - first.firstMessage.createdAt;
      } else if (!first.firstMessage) {
        return 1;
      } else return -1;
    });
  }

  renderConvos(convos) {
    const sortedConvos = this.sortConvos(convos);
    return sortedConvos.map(convoData => {
      if (convoData.firstMessage) {
        const id = convoData.id;
        const friends = convoData.friends;
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
                friends,
                friendPrefs: convoData.friendPrefs,
                userPrefs: convoData.userPrefs,
              })
            }
          >
            <Left>{this.renderThumbnail(friends, firstMessage)}</Left>
            <Body>
              <Text>{this.renderNames(friends)}</Text>
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
            onPress={() => {
              this.enterSearch(this.state.search);
            }}
          >
            <Image
              source={require('../../public/buttons/search.png')}
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'white',
                borderColor: 'white',
              }}
            />
          </Button>
          <Button
            transparent
            onPress={() => {
              navigation.navigate('CreateConvo');
            }}
          >
            <Image
              source={require('../../public/buttons/plus.png')}
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'white',
                borderColor: 'white',
              }}
            />
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
              <Image source={require('../../public/buttons/no-messages.png')} />
              <Text style={styles.none}>No conversations yet</Text>
              <Text style={styles.noneSmall}>Why don't you start one?</Text>
            </Container>
          )}
        </Content>
        <Navbar navigation={this.props.navigation} />
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
    const userPrefs = data[`${this.user.uid}-prefs`];
    const friendIDs = data.users.filter(id => id !== this.user.uid);
    let friends = [];
    let friendPrefs = [];
    for (let id of friendIDs) {
      friendPrefs.push(data[`${id}-prefs`]);
      const friendQuery = await db
        .collection('users')
        .doc(id)
        .get();
      const friend = friendQuery.data();
      friends.push(friend);
    }
    return { firstMessage, friends, friendPrefs, userPrefs };
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

console.disableYellowBox = true;
