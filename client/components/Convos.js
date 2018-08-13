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
  }

  enterSearch(search) {
    console.log('search: ', search);
    console.log(
      'this would filter the messages and only return ones relevant to the search'
    );
  }

  async componentDidMount() {
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
    }
    this.setState({ convos });
  }

  render() {
    const navigation = this.props.navigation;
    const convosOnState = this.state.convos;
    const firstConvo = convosOnState[0];
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
                onPress={() =>
                  navigation.navigate('SingleConvo', {
                    convos: firstConvo,
                  })
                }
              >
                <Left>
                  <Thumbnail
                    source={{ uri: 'https://placeimg.com/140/140/any' }}
                  />
                </Left>
                <Body>
                  <Text>{firstConvo.users[0]}</Text>
                  <Text note>{firstMessage.text}.</Text>
                </Body>
                <Right>
                  <Text note>{firstMessage.time}</Text>
                </Right>
              </ListItem>
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
