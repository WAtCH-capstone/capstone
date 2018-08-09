import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Separator,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Button,
  List,
} from 'native-base';

export default class Settings extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header />
        <Content>
          <Separator bordered>
            <Text>Your Profile</Text>
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

          {/* <ListItem>
            <Text>Username</Text>
          </ListItem>
          <ListItem last>
            <Text>Email</Text>
          </ListItem> */}
          <Separator bordered>
            <Text>Options</Text>
          </Separator>
          <List>
            <ListItem selected>
              <Text>Edit your profile</Text>
            </ListItem>
            <ListItem selected>
              <Text>Change your password</Text>
            </ListItem>
            <ListItem selected last>
              <Text>Logout</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
