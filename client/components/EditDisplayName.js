import React, { Component } from 'react';
import { Container, Form, Item, Input, Label, Button } from 'native-base';
import { Text } from 'react-native';
const firebase = require('firebase');
import db from '../../firestore';

export default class EditDisplayName extends Component {
  constructor() {
    super();
    this.state = { displayName: '' };
  }

  render() {
    const navigation = this.props.navigation;
    const currUserId = firebase.auth().currentUser.uid;
    const currUserRef = db.collection('users').doc(currUserId);
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>New display name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={displayName => this.setState({ displayName })}
            />
          </Item>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              currUserRef
                .update({ displayName: this.state.displayName })
                .then(() => alert(`Your display name was updated!`))
                .then(() => navigation.navigate('Convos'))
                .catch(err => console.error(err));
            }}
          >
            <Text style={{ color: 'white' }}>Save</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

console.disableYellowBox = true;
