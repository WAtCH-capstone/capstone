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
      name: '',
      search: '',
    };

    this.user = firebase.auth().currentUser;
    this.getUserName = this.getUserName.bind(this);
  }

  enterSearch(search) {
    console.log('search: ', search);
    console.log(
      'this would filter the messages and only return ones relevant to the search'
    );
  }

  async componentDidMount() {
    this.getUserName();
    const email = await firebase.auth().currentUser.email;
    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    const userData = snapshot.docs.map(doc => doc.data());

    let convos = [];

    for (let id of userData[0].conversations) {
      let convo = await db
        .collection('conversations')
        .doc(id)
        .get();
      convos.push(convo.data());
      convos.push(id);
    }
    this.setState({ convos });
  }

  async getRef(id) {
    return db.collection('conversations').doc(id);
  }
  async getUserName() {
    const userRef = await db
      .collection('users')
      .doc('REQv5MZj0mRHUnZkVfOGm8uVsyo2'); // need to change this
    const getDoc = userRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          this.setState({ name: doc.data().displayName });
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  render() {
    const navigation = this.props.navigation;
    const convosOnState = this.state.convos;
    const convo = convosOnState[0];
    if (convosOnState && convosOnState.length) {
      const firstMessage = firstConvo.messages[0];
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
            <List>
              <ListItem
                key={1}
                avatar
                onPress={() => {
                  const friend = convo.users.filter(id => id !== this.user.uid);
                  const ref = this.getRef(convosOnState[1]);
                  navigation.navigate('SingleConvo', {
                    convo,
                    ref,
                    user: this.user,
                    friend,
                  });
                }}
              />
              <Left>
                <Thumbnail
                  source={{ uri: 'https://placeimg.com/140/140/any' }}
                />
              </Left>
              <Body>
                {/* {firstConvo.users[1]} */}
                <Text>{this.state.name}</Text>
                <Text note>{firstMessage.text}.</Text>
              </Body>
              <Right>
                <Text note>{firstMessage.time}</Text>
              </Right>
            </List>
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
