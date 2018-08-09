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

export default class Settings extends Component {
  constructor() {
    super();
    this.editProfile = this.editProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.logout = this.logout.bind(this);
  }

  editProfile() {
    console.log('this will allow the user to edit their profile');
  }

  changePassword() {
    console.log('this will allow the user to change their password');
  }

  logout() {
    console.log('this will allow the user to logout');
  }

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
                <Thumbnail
                  source={{
                    uri:
                      'https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ',
                  }}
                />
                <Body>
                  <Text>Filler Name</Text>
                  <Text note>username123</Text>
                  <Text note>email@gmail.com</Text>
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
                  this.editProfile();
                }}
              >
                <Text>Edit your profile</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  this.changePassword();
                }}
              >
                <Text>Change your password</Text>
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
