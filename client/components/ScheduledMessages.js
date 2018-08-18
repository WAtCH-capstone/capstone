import React, { Component } from 'react';
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
  Right,
  Thumbnail,
} from 'native-base';
import Navbar from './Navbar';

export default class ScheduledMesages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
    this.user = firebase.auth().currentUser;
  }
  async getMessages() {
    const snapshot = await db
      .collection('users')
      .doc(this.user.uid)
      .collection('scheduled')
      .get();
    const data = snapshot.docs.map(doc => doc.data());
    console.log(data);
    let messages = [];
    for (let message of data) {
      console.log(message);
      const friend = await this.getFriend(message.convoID);
      messages.push({ message, friend });
    }
    this.setState({ messages });
  }

  async getFriend(id) {
    const convo = await db
      .collection('conversations')
      .doc(id)
      .get();
    const data = convo.data();
    const friendID = data.users.find(id => id !== this.user.uid);
    console.log(friendID);
    const friend = await db
      .collection('users')
      .doc(friendID)
      .get();
    return friend.data();
  }

  async componentDidMount() {
    await this.getMessages();
  }

  renderScheduled(messages) {
    console.log(messages);
    return messages.map(data => {
      const time = new Date(data.message.newMessage.createdAt).toString();
      return (
        <ListItem key={data.message.newMessage.createdAt}>
          <Left>
            <Text>{data.friend.displayName}</Text>
          </Left>
          <Body>
            <Text>{data.message.newMessage.text}</Text>
          </Body>
          <Right>
            <Text note>{time}</Text>
          </Right>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content>
          {this.state.messages && this.state.messages.length ? (
            <List>{this.renderScheduled(this.state.messages)}</List>
          ) : (
            <Text>No scheduled messages.</Text>
          )}
        </Content>
        <Navbar navigation={this.props.navigation} />
      </Container>
    );
  }
}
