import React from 'react';
import { Image } from 'react-native';
import { Container, Form, Input, Item, Button, Label, Text } from 'native-base';
const firebase = require('firebase');
import styles from './Styles';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Convos'));
    } catch (error) {
      console.log(error.toString());
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong Password');
      } else {
        alert(errorMessage);
      }
    }
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <Container style={{ paddingBottom: 100 }}>
        <Image
          source={require('../../public/buttons/now-or-later.png')}
          style={styles.logo}
        />
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={email => {
                this.setState({ email });
              }}
            />
          </Item>
          {/* {!this.state.email.includes('@' && '.') &&
          this.state.email.length > 0 ? (
            <Text style={styles.errorMessage}>
              Please enter a valid email address
            </Text>
          ) : null} */}
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
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.loginUser(this.state.email, this.state.password);
            }}
          >
            <Text style={{ color: 'white' }}>Log in</Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={{ color: 'white' }}>Sign up</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="Sign up"
          />
        </Form>
      </Container>
    );
  }
}

console.disableYellowBox = true;
