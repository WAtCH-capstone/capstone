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
      conversations: [],
    };
    this.signUpUser = this.signUpUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async signUpUser(email, password) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = await firebase.auth().currentUser;
      alert(`Account created for ${email}. Now you may login.`);
      return currentUser.uid;
    } catch (err) {
      console.log(err.toString());
    }
  }

  async createUser(id) {
    await db
      .collection('users')
      .doc(id)
      .set(this.state)
      .then(ref => {
        console.log('Added document with ID: ', ref.id);
      });
  }

  render() {
    const navigation = this.props.navigation;
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
              onChangeText={email => {
                this.setState({ email });
              }}
            />
          </Item>

          {/* E-MAIL ERROR MESSAGE */}
          {!this.state.email.includes('@' && '.') &&
          this.state.email.length > 0 ? (
            <Text style={{ color: 'red' }}>
              Please enter a valid e-mail address
            </Text>
          ) : null}

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              secureTextEntry={true}
              onChangeText={password => {
                this.setState({ password });
              }}
            />
          </Item>

          {/* PASSWORD ERROR MESSAGE */}
          {this.state.password.length < 6 && this.state.password.length > 0 ? (
            <Text style={{ color: 'red' }}>
              Password must be at least 6 characters
            </Text>
          ) : null}

          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={() => {
              navigation.navigate('EmojiPicker');
            }}
          >
            <Text style={{ color: 'white' }}>Pick Your Avatar</Text>
          </Button>

          {/* SIGN UP BUTTON DISABLED UNTIL CONCERNS ARE MET */}
          {this.state.password.length < 6 ? (
            <Button
              disabled={true}
              style={{ marginTop: 10, backgroundColor: '#D1D1D1' }}
              full
              rounded
              primary
            >
              <Text style={{ color: 'white' }}>Sign up</Text>
            </Button>
          ) : (
            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={async () => {
                const id = await this.signUpUser(
                  this.state.email,
                  this.state.password
                );
                await this.createUser(id);
                navigation.navigate('LogIn');
              }}
            >
              <Text style={{ color: 'white' }}>Sign up</Text>
            </Button>
          )}
        </Form>
      </Container>
    );
  }
}
export default SignUp;

console.disableYellowBox = true;
