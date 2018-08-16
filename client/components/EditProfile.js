import React, { Component } from 'react';
import { Container, Form, Item, Label, Input, Button } from 'native-base';
import { Text } from 'react-native';
const firebase = require('firebase');
import db from '../../firestore';
import { user } from 'firebase-functions/lib/providers/auth';

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      userName: '',
      email: '',
      password: '',
      icon: '',
      conversations: [],
    };
  }

  async componentDidMount() {
    const uid = await firebase.auth().currentUser.uid;
    const snapshot = await db
      .collection('users')
      .doc(uid)
      .get();
    const userData = await snapshot.data();
    this.setState = {
      displayName: userData.displayName,
      userName: userData.userName,
      email: userData.email,
      password: userData.password,
      icon: userData.icon,
      conversations: userData.conversations,
    };
  }

  render() {
    const navigation = this.props.navigation;
    console.log('this.state: ', this.state);
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Display Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              value={user.displayName}
              onChangeText={displayName => this.setState({ displayName })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              value={user.userName}
              onChangeText={userName => this.setState({ userName })}
            />
          </Item>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              value={user.email}
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

          {/* BUTTON DISABLED UNTIL CONCERNS ARE MET */}
          {!this.state.email.includes('@' && '.') ? (
            <Button
              disabled={true}
              style={{ marginTop: 10, backgroundColor: '#D1D1D1' }}
              full
              rounded
              primary
            >
              <Text style={{ color: 'white' }}>Pick Your Avatar</Text>
            </Button>
          ) : (
            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              info
              onPress={async () => {
                const id = await this.signUpUser(
                  this.state.email,
                  this.state.password
                );
                this.createUser(id).then(() =>
                  navigation.navigate('EmojiPicker')
                );
              }}
            >
              <Text style={{ color: 'white' }}>Pick Your Avatar</Text>
            </Button>
          )}
        </Form>
      </Container>
    );
  }
}

console.disableYellowBox = true;
