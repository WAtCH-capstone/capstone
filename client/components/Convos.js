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
import db from '../../firestore';
import firebase from 'firebase';

export default class Convos extends Component {
  constructor() {
    super();
    this.state = {
      convos: [],
      search: '',
    };
    this.user = firebase.auth().currentUser;
    this.enterSearch = this.enterSearch.bind(this);
  }

  enterSearch(search) {
    console.log('search: ', search);
    console.log(
      'this would filter the messages and only return ones relevant to the search'
    );
  }

  async componentDidMount() {
    // this.getUserName();
    const uid = await firebase.auth().currentUser.uid;
    const snapshot = await db
      .collection('users')
      .doc(uid)
      .get();
    const userData = await snapshot.data();
    let convosArr = [];
    for (let id of userData.conversations) {
      const convoData = await this.getData(id);
      const firstMessage = convoData.firstMessage;
      const friend = convoData.friend;
      convosArr.push({ id, firstMessage, friend });
    }
    this.setState({ convos: convosArr });
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

  // async getFirstMessage(id) {
  //   const convo = await db
  //     .collection('conversations')
  //     .doc(id)
  //     .get();
  //   return convo.data().firstMessage;
  // }

  // async getFriend(id) {
  //   const friendID = convo.users.find(id => id !== this.user.uid);
  //   const friend = await db
  //     .collection('users')
  //     .doc(friendID)
  //     .get();
  //   return friend.data();
  // }

  renderConvos(convos) {
    // const sorted = convos.sort(
    //   (a, b) => a.firstMessage.createdAt - b.firstMessage.createdAt || 0
    // );
    return convos.map(convoData => {
      const navigation = this.props.navigation;
      const id = convoData.id;
      const friend = convoData.friend;
      const firstMessage = convoData.firstMessage;
      return (
        <ListItem
          key={id}
          avatar
          onPress={() =>
            navigation.navigate('SingleConvo', {
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
          <Right>{/* <Text note>{firstMessage.time}</Text> */}</Right>
        </ListItem>
      );
    });
  }

  render() {
    const convos = this.state.convos;
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header searchBar rounded>
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
          {convos && convos.length ? (
            <List>{this.renderConvos(convos)}</List>
          ) : (
            <Text>No conversations yet</Text>
          )}
        </Content>
      </Container>
    );
  }
}
