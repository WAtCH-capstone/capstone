import React from 'react';
import { Container, Form, Item, Label, Input, Button } from 'native-base';
import { Text } from 'react-native';
const firebase = require('firebase');
import db from '../../firestore';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      userName: '',
      email: '',
      password: '',
    };
    this.signUpUser = this.signUpUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  signUpUser(email, password) {
    try {
      if (this.state.password.length < 6) {
        alert('Please enter at least 6 characters');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
      alert(`Account created for ${email}. Now you may login.`);
    } catch (err) {
      console.log(err.toString());
    }
  }

  createUser() {
    db.collection('users')
      .add(this.state)
      .then(ref => {
        console.log('Added document with ID: ', ref.id);
      });
  }

  render() {
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Display Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={displayName => this.setState({ displayName })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={userName => this.setState({ userName })}
            />
          </Item>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.signUpUser(this.state.email, this.state.password);
              this.createUser();
              // also need to make a user entry in our database with other info
            }}
          >
            <Text style={{ color: 'white' }}>Sign up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
export default SignUp;

console.disableYellowBox = true;
