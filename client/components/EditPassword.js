import React from 'react';
import { Container, Form, Item, Input, Label, Button } from 'native-base';
import { Text } from 'react-native';
const firebase = require('firebase');
import db from '../../firestore';
import styles from './Styles';

export default class EditPassword extends React.Component {
  constructor() {
    super();
    this.state = { password: '' };
  }

  render() {
    const navigation = this.props.navigation;
    const currUser = firebase.auth().currentUser;
    const currUserRef = db.collection('users').doc(currUser.uid);
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>New password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          {this.state.password.length < 6 ? (
            <Text style={styles.errorMessage}>
              Password must be at least 6 characters
            </Text>
          ) : null}
          {this.state.password.length < 6 ? (
            <Button
              disabled={true}
              style={{ marginTop: 10, backgroundColor: '#D1D1D1' }}
              full
              rounded
              primary
            >
              <Text style={{ color: 'white' }}>Save</Text>
            </Button>
          ) : (
            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() => {
                currUserRef
                  .update({ password: this.state.password })
                  .then(() => currUser.updatePassword(this.state.password))
                  .then(() => alert(`Your password was updated!`))
                  .then(() => navigation.navigate('Convos'))
                  .catch(err => console.error(err));
              }}
            >
              <Text style={{ color: 'white' }}>Save</Text>
            </Button>
          )}
        </Form>
      </Container>
    );
  }
}

console.disableYellowBox = true;
