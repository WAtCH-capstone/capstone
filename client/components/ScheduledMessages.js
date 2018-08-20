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
    let messages = [];
    for (let message of data) {
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
    const friend = await db
      .collection('users')
      .doc(friendID)
      .get();
    return friend.data();
  }

  async componentDidMount() {
    await this.getMessages();
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
