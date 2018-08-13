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

  async createNewConvo(email) {
    console.log('this would make a new conversation');

    // grab current user information
    const currUserId = await firebase.auth().currentUser.uid;
    // const currUserSnapshot = await db
    //   .collection('users')
    //   .doc(currUserId)
    //   .get();
    // const currUserData = await currUserSnapshot.data();

    // create new conversation

    const convosRef = db.collection('conversations');
    // Create a new ref and save data to it in one step
    const newConvoRef = convosRef.push({
      messages: [],
      users: [currUserId, 'lol123'],
    });

    // THINGS THAT MUST OCCUR HERE:
    // create a new document in 'conversations' collection
    //    this document should have an emty messages array
    //    this document should have a users array with two users
    //        one should have the ID of the current logged in user
    //        the other should have the ID of the user associated with the email that has              been input in the form
    // this should also add to the 'conversations' array on both of the users participating
    //    just concat the id of the new document in the 'conversations' collection

    // try {
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email)
    //     .then(() => this.props.navigation.navigate('Convos'));
    // } catch (err) {
    //   console.log(err.toString());
    // }
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
