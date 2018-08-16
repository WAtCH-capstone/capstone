import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
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
  List
} from "native-base";
import db from "../../firestore";
import firebase from "firebase";

export default class Settings extends Component {
  constructor() {
    super();
    this.getUser = this.getUser.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.logout = this.logout.bind(this);
  }

  async getUser() {
    const uid = await firebase.auth().currentUser.uid;
    const snapshot = await db
      .collection("users")
      .doc(uid)
      .get();
    const userData = await snapshot.data();
    return userData;
  }

  editProfile() {
    // this.state.currUserRef.update({
    //   conversations: firebase.firestore.FieldValue.arrayUnion(docRef.id),
    // });
  }

  changePassword() {}

  logout() {}

  render() {
    const navigation = this.props.navigation;
    const userData = this.getUser();
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
                      "https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ"
                  }}
                />
                <Body>
                  <Text>
                    {userData.displayName ? userData.displayName : null}
                  </Text>
                  <Text note>
                    {userData.username ? userData.username : null}
                  </Text>
                  <Text note>{userData.email ? userData.email : null}</Text>
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
