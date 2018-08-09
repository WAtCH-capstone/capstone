import React from 'react';
import { Image } from 'react-native';
import { Container, Form, Input, Item, Button, Label, Text } from 'native-base';

const firebase = require('firebase');
import db from '../firestore';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => console.log(user));
    } catch (err) {
      console.log(err.toString());
    }
  }

  render() {
    return (
      <Container>
        <Image
          source={{
            uri:
              'https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ',
          }}
          style={{
            width: '100%',
            height: '60%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Form>
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
              this.loginUser(this.state.email, this.state.password);
              navigation.navigate('Convos');
            }}
          >
            <Text style={{ color: 'white' }}>Log in</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LogIn;
