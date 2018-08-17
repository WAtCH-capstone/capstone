import React, { Component } from 'react';
import db from '../../firestore';
import firebase from 'firebase';
import { ListItem } from 'native-base';

export default class ScheduledMesages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
    this.user = firebase.auth().currentUser;
  }
  async getMessages() {
    const snapshot = db
      .collection('users')
      .doc(this.user.uid)
      .collection('scheduled')
      .get();
    console.log(snapshot);
    this.setState({ messages });
  }

  async componentDidMount() {
    await this.getMessages();
  }

  renderScheduled(messages) {
    return messages.map(message => (
      <ListItem>
        <Text>{message.text}</Text>
      </ListItem>
    ));
  }

  render() {
    return (
      <Container>
        <Content>
          <List>{this.renderScheduled(this.state.messages)}</List>
        </Content>
        <Navbar navigation={this.props.navigation} />
      </Container>
    );
  }
}
