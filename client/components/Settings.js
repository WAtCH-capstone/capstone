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
    this.state = {
      user: {},
    };
    this.getUser = this.getUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    this.setState({ user: await this.getUser() });
  }

  async getUser() {
    const uid = await firebase.auth().currentUser.uid;
    const snapshot = await db
      .collection('users')
      .doc(uid)
      .get();
    const userData = await snapshot.data();
    return userData;
  }

  changePassword() {}

  logout() {}

  render() {
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
                <Thumbnail source={{ uri: this.state.user.icon }} />
                <Body>
                  <Text>{this.state.user.displayName}</Text>
                  <Text note>{this.state.user.userName}</Text>
                  <Text note>{this.state.user.email}</Text>
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
                  navigation.navigate('EditProfile');
                }}
              >
                <Text>Edit profile</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  this.changePassword();
                }}
              >
                <Text>Change password</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem last>
              <TouchableOpacity
                onPress={() => {
                  this.logout();
                }}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
