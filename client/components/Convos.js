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
  View,
} from 'native-base';
import { StyleSheet } from 'react-native';
import db from '../../firestore';
import firebase from 'firebase';
import Navbar from './Navbar';

export default class Convos extends Component {
  constructor() {
    super();
    this.state = {
      convos: [],
      search: '',
      results: [],
    };
    this.user = firebase.auth().currentUser;
    this.enterSearch = this.enterSearch.bind(this);
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
      this.setState({ results: searchResult });
    }
  }

  renderConvos(convos) {
    const navigation = this.props.navigation;

    return convos.map(convoData => {
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
          ) : (
            <Text>No conversations yet</Text>
          )}
        </Content>
        <Navbar navigation={this.props.navigation} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    paddingTop: -20,
    marginBottom: 8,
  },
});
