import React from 'react';
import { Container, Form, Item, Label, Input, Button } from 'native-base';
import { Text } from 'react-native';
const firebase = require('firebase');
import db from '../../firestore';
import CameraRollPicker from 'react-native-camera-roll-picker';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      userName: '',
      email: '',
      password: '',
      selected: [],
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

  getSelectedImages(images, current) {
    var num = images.length;
    this.setState({
      num: num,
      selected: images,
    });
    console.log(current);
    console.log(this.state.selected);
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <CameraRollPicker
              scrollRenderAheadDistance={500}
              initialListSize={1}
              pageSize={3}
              removeClippedSubviews={false}
              groupTypes="SavedPhotos"
              batchSize={5}
              maximum={3}
              selected={this.state.selected}
              assetType="Photos"
              imagesPerRow={3}
              imageMargin={5}
              callback={this.getSelectedImages.bind(this)}
            />
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
              navigation.navigate('LogIn');
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
