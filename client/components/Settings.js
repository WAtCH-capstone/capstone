import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Text,
  Separator,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  List,
} from 'native-base';
import db from '../../firestore';
import firebase from 'firebase';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = { userDoc: {}, userRef: {} };
    this.getUserDoc = this.getUserDoc.bind(this);
    this.deleteUser = this.deleteUser.bind(this)
  }

  async componentDidMount() {
    this.setState({
      userDoc: await this.getUserDoc(),
      userRef: firebase.auth().currentUser,
    });
  }

  async getUserDoc() {
    const uid = await firebase.auth().currentUser.uid;
    const snapshot = await db
      .collection('users')
      .doc(uid)
      .get();
    const userData = await snapshot.data();
    return userData;
  }

  async deleteUser() {
    // array of conversations that the user is apart of
    // for each conversation...
        // grab the other participant
        // delete the conversation id from their conversations array
    

    this.state.userRef
      .delete()
      .then(() => this.state.userDoc.conversations.forEach((conversation) => ))
      .then(() => alert(`Your account was deleted.`))
      .then(() => navigation.navigate('LogIn'))
      .catch(err => console.error(err));
  }

  render() {
    const userDoc = this.state.userDoc;
    const navigation = this.props.navigation;
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>My Profile</Text>
          </Separator>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: userDoc.icon }} />
                <Body>
                  <Text>{userDoc.displayName}</Text>
                  <Text note>{userDoc.userName}</Text>
                  <Text note>{userDoc.email}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Separator bordered>
            <Text>Options</Text>
          </Separator>
          <List>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditDisplayName');
                }}
              >
                <Text>Edit display name</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditUserName');
                }}
              >
                <Text>Edit username</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EmojiPicker');
                }}
              >
                <Text>Change icon</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditEmail');
                }}
              >
                <Text>Change email</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditPassword');
                }}
              >
                <Text>Change password</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(() => alert(`You've been logged out.`))
                    .catch(err => console.error(err));
                }}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem last>
              <TouchableOpacity
                onPress={() => this.deleteUser()}
              >
                <Text>Delete account</Text>
              </TouchableOpacity>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
