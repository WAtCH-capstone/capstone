import React from 'react';
import { Container, Form, Item, Input, Label, Button } from 'native-base';
import { Text } from 'react-native';
const firebase = require('firebase');
import db from '../../firestore';
import styles from './Styles';

export default class EditEmail extends React.Component {
  constructor() {
    super();
    this.state = { email: '' };
  }

  render() {
    const navigation = this.props.navigation;
    const currUser = firebase.auth().currentUser;
    const currUserRef = db.collection('users').doc(currUser.uid);
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>New email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          {!this.state.email.includes('@' && '.') &&
          this.state.email.length > 0 ? (
            <Text style={styles.errorMessage}>
              Please enter a valid email address
            </Text>
          ) : null}
          {!this.state.email.includes('@' && '.') &&
          this.state.email.length > 0 ? (
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
                  .update({ email: this.state.email })
                  .then(() => currUser.updateEmail(this.state.email))
                  .then(() => alert(`Your email was updated!`))
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
