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

export default class Convos extends React.Component {
  constructor() {
    super();
    this.state = {
      convos: [],
      search: '',
    };

    this.user = firebase.auth().currentUser;
    // this.getUserName = this.getUserName.bind(this);
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

    console.log('snapshot', snapshot);
    const userData = await snapshot.data();
    console.log('user', userData);
    let convosArr = [];

    for (let id of userData.conversations) {
      let convo = await db
        .collection('conversations')
        .doc(id)
        .get();
      convosArr.push(convo.data());
      // convos.push(id);
    }
    this.setState({ convos: convosArr });
  }

  async getRef(id) {
    return db.collection('conversations').doc(id);
  }

  async getFriend(id) {
    const friend = await db
      .collection('users')
      .doc(id)
      .get();
    return friend.data();
  }

  async renderConvo(convo) {
    const navigation = this.props.navigation;
    const friendID = convo.users.find(id => id !== this.user.uid);
    const friend = await this.getFriend(friendID);
    console.log('NAME', friend.displayName);
    const firstMessage = convo.messages[0];
    return (
      <React.Fragment>
        <ListItem
          key={1}
          avatar
          onPress={() =>
            navigation.navigate('SingleConvo', {
              convo,
              // ref,
              user: this.user,
              friend,
            })
          }
        />
        <Left>
          <Thumbnail source={{ uri: 'https://placeimg.com/140/140/any' }} />
        </Left>
        <Body>
          <Text>{friend.displayName}</Text>
          <Text note>{firstMessage.text}</Text>
        </Body>
        <Right>
          <Text note>{firstMessage.time}</Text>
        </Right>
      </React.Fragment>
    );
  }
  // async getUserName() {
  //   const userRef = await db
  //     .collection('users')
  //     .doc('REQv5MZj0mRHUnZkVfOGm8uVsyo2'); // need to change this
  //   const getDoc = userRef
  //     .get()
  //     .then(doc => {
  //       if (!doc.exists) {
  //         console.log('No such document!');
  //       } else {
  //         this.setState({ name: doc.data().displayName });
  //       }
  //     })
  //     .catch(err => {
  //       console.log('Error getting document', err);
  //     });
  // }

  render() {
    const convos = this.state.convos;
    console.log('convo on state:', convos[0]);
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
          </Header>
          <Content>
            <List>{convos.map(convo => this.renderConvo(convo))}</List>
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
