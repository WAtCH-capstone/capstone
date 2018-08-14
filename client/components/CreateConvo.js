import React, { Component } from 'react';
import { Container, Form, Input, Item, Button, Label, Text } from 'native-base';
import db from '../../firestore';
import firebase from 'firebase';

export default class CreateConvo extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
    this.createNewConvo = this.createNewConvo.bind(this);
  }

  async createNewConvo(recipientEmail) {
    const recipientQuery = await db
      .collection('users')
      .where('email', '==', recipientEmail)
      .get();
    const recArr = recipientQuery.docs.map(doc => doc.data());
    const recipient = recArr[0];
    const recipientId = recipientQuery.docs[0].id;
    const currUserId = await firebase.auth().currentUser.uid;
    const currUserRef = db.collection('users').doc(currUserId);
    const recipientRef = db.collection('users').doc(recipientId);
    db.collection('conversations')
      .add({
        users: [currUserId, recipientId],
      })
      .then(docRef => {
        currUserRef.update({
          conversations: firebase.firestore.FieldValue.arrayUnion(docRef.id),
        });
        recipientRef.update({
          conversations: [...recipient.conversations, docRef.id],
        });
        return docRef.id;
      })
      .then(id =>
        this.props.navigation.navigate('SingleConvo', {
          id,
          convo: { messages: [] },
          user: { uid: currUserId },
          friend: { displayName: recipient.displayName },
        })
      )
      .catch(err => console.error(err));
  }

  render() {
    // const navigation = this.props.navigation;
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Recipient E-mail</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.createNewConvo(this.state.email);
            }}
          >
            <Text style={{ color: 'white' }}>Create Conversation</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
