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
    this.newConvo = this.newConvo.bind(this);
  }

  newConvo() {
    console.log('this would create a new convo');
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
      const convo = await this.getConvo(id);
      const friend = await this.getFriend(convo);
      convosArr.push({ id, convo, friend });
    }
    this.setState({ convos: convosArr });
  }

  async getConvo(id) {
    const convo = await db
      .collection('conversations')
      .doc(id)
      .get();
    return convo.data();
  }

  async getFriend(convo) {
    const friendID = convo.users.find(id => id !== this.user.uid);
    const friend = await db
      .collection('users')
      .doc(friendID)
      .get();
    return friend.data();
  }

  renderConvos(convos) {
    const reversed = convos.reverse();
    return reversed.map(convoData => {
      const navigation = this.props.navigation;
      const id = convoData.id;
      const convo = convoData.convo;
      const friend = convoData.friend;
      const firstMessage = convo.messages[0];

      return (
        <ListItem
          key={id}
          avatar
          onPress={() =>
            navigation.navigate('SingleConvo', {
              id,
              convo,
              user: this.user,
              friend,
            })
          }
        >
          <Left>
            <Thumbnail source={{ uri: 'https://placeimg.com/140/140/any' }} />
          </Left>
          <Body>
            <Text>{friend.displayName}</Text>
            <Text note>{firstMessage.text}</Text>
          </Body>
          <Right>{/* <Text note>{firstMessage.time}</Text> */}</Right>
        </ListItem>
      );
    });
  }

  render() {
    const convos = this.state.convos;
    if (convos && convos.length) {
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
            <Button transparent onPress={() => this.newConvo()}>
              <Text>New</Text>
            </Button>
          </Header>
          <Content>
            <List>{this.renderConvos(convos)}</List>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Text>No conversations</Text>
        </Container>
      );
    }
  }
}
