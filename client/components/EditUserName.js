import React from 'react';
import { Container, Form, Item, Input, Label, Button } from 'native-base';
import { Text } from 'react-native';
const firebase = require('firebase');
import db from '../../firestore';

export default class EditUserName extends React.Component {
  constructor() {
    super();
    this.state = { userName: '' };
  }

  render() {
    const navigation = this.props.navigation;
    const currUserId = firebase.auth().currentUser.uid;
    const currUserRef = db.collection('users').doc(currUserId);
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>New username</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={userName => this.setState({ userName })}
            />
          </Item>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              console.log('updating username to ', this.state.userName);
              currUserRef
                .update({ userName: this.state.userName })
                .then(() => alert(`Your username was updated!`))
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
