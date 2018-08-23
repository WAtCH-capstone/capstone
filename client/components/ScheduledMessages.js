import React from 'react';
import db from '../../firestore';
import firebase from 'firebase';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Header,
  Item,
  Input,
  Button,
  Right,
} from 'native-base';
import { ActivityIndicator, Image } from 'react-native';
import styles from './Styles';
import Navbar from './Navbar';

export default class ScheduledMesages extends React.Component {
  constructor() {
    super();
    this.state = { messages: [], isLoading: true, search: '', results: [] };
    this.user = firebase.auth().currentUser;
    this.enterSearch = this.enterSearch.bind(this);
  }

  async getMessages() {
    const snapshot = await db
      .collection('users')
      .doc(this.user.uid)
      .collection('scheduled')
      .get();
    const data = snapshot.docs.map(doc => doc.data());
    let messages = [];
    for (let message of data) {
      const friend = await this.getFriend(message.convoID);
      messages.push({ message, friend });
    }
    this.setState({ messages, isLoading: false });
  }

  async getFriend(id) {
    const convo = await db
      .collection('conversations')
      .doc(id)
      .get();
    const data = convo.data();
    const friendID = data.users.find(id => id !== this.user.uid);
    const friend = await db
      .collection('users')
      .doc(friendID)
      .get();
    return friend.data();
  }

  async componentDidMount() {
    await this.getMessages();
  }

  enterSearch(search) {
    let messages = this.state.messages;
    let searchResult = [];
    if (!search.length) {
      this.setState({ results: messages, isLoading: false });
    }
    for (let i = 0; i < messages.length; i++) {
      if (search === messages[i].friend.displayName) {
        searchResult.push(messages[i]);
      }
      this.setState({
        results: searchResult,
        isLoading: false,
      });
    }
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
    } else if (hour === 12) {
      if (minute < 10) return `${hour}:0${minute} pm`;
      else return `${hour}:${minute} pm`;
    } else {
      if (minute < 10) return `${hour}:0${minute} am`;
      else return `${hour}:${minute} am`;
    }
  }

  renderScheduled(messages) {
    return messages.map(data => {
      const date = new Date(data.message.newMessage.createdAt);
      const time = this.dateToTime(date);
      const timeArr = date.toString().split(' ');
      const displayTime =
        timeArr[0] + ' ' + timeArr[1] + ' ' + timeArr[2] + ' at ' + time;
      return (
        <ListItem key={data.message.newMessage.createdAt}>
          <Left>
            <Text>{data.friend.displayName}</Text>
          </Left>
          <Body>
            <Text>{data.message.newMessage.text}</Text>
            <Text note>{displayTime}</Text>
          </Body>
        </ListItem>
      );
    });
  }

  render() {
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
        </Header>
        <Content>
          {this.state.results && this.state.results.length ? (
            <List>
              <ListItem key={1}>
                <Left>
                  <Text style={styles.scheduledFriend}>Friend</Text>
                </Left>
                <Left>
                  <Text style={styles.scheduledMessage}>Message</Text>
                </Left>
              </ListItem>
              {this.renderScheduled(this.state.results)}
            </List>
          ) : this.state.messages && this.state.messages.length ? (
            <List>
              <ListItem key={1}>
                <Left>
                  <Text style={styles.scheduledFriend}>Friend</Text>
                </Left>
                <Left>
                  <Text style={styles.scheduledMessage}>Message</Text>
                </Left>
              </ListItem>
              {this.renderScheduled(this.state.messages)}
            </List>
          ) : this.state.isLoading ? (
            <ActivityIndicator size="large" color="#3B80FE" />
          ) : (
            <Container style={styles.noneContainer}>
              <Image source={require('../../public/buttons/no-messages.png')} />
              <Text style={styles.none}>No scheduled messages yet</Text>
              <Text style={styles.noneSmall}>Why don't you send one?</Text>
            </Container>
          )}
        </Content>
        <Navbar navigation={this.props.navigation} />
      </Container>
    );
  }
}

console.disableYellowBox = true;
