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
  Right,
  List,
  Button,
} from 'native-base';
import Navbar from './Navbar';
import db from '../../firestore';
import firebase from 'firebase';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = { userDoc: {}, userRef: {}, requests: [] };
    this.getUserDoc = this.getUserDoc.bind(this);
    this.logout = this.logout.bind(this);
    // this.deleteUser = this.deleteUser.bind(this);
  }

  async componentDidMount() {
    const uid = await firebase.auth().currentUser.uid;
    const userData = await this.getUserDoc(uid);
    const requests = await this.getFriendRequests(userData.requests);
    this.setState({
      userDoc: userData,
      userRef: firebase.auth().currentUser,
      requests,
    });
  }

  async getUserDoc(id) {
    const snapshot = await db
      .collection('users')
      .doc(id)
      .get();
    const userData = await snapshot.data();
    return userData;
  }

  async getFriendRequests(requestArr) {
    let requests = [];
    for (let id of requestArr) {
      const user = await db
        .collection('users')
        .doc(id)
        .get();
      const data = await user.data();
      const objToAdd = { id, data };
      requests.push(objToAdd);
    }
    return requests;
  }

  async acceptRequest(requestor, index) {
    console.log(this.state);
    console.log(requestor);
    console.log(index);
    const uid = await firebase.auth().currentUser.uid;
    // await db
    //   .collection('users')
    //   .doc(this.state.userRef.uid)
    //   .set(
    //     {
    //       friends: [...this.state.userDoc.friends, requestor.id],
    //       requests: this.state.userDoc.requests.splice(index, 1),
    //     },
    //     { merge: true }
    //   );
    // await db
    //   .collection('users')
    //   .doc(requestor.id)
    //   .set({ friends: [...requestor.data.friends, uid] }, { merge: true });
    // await this.setState(prevState => ({
    //   requests: prevState.requests.splice(index, 1),
    // }));
    // alert(
    //   `You and ${
    //     requestor.data.displayName
    //   } are now friends. Send them a message!`
    // );
  }

  async declineRequest(index) {
    const newRequests = this.state.requests.splice(index, 1);
    await this.state.userRef.set({ requests: newRequests }, { merge: true });
    this.setState({ requests: newRequests });
  }

  renderRequests() {
    return this.state.requests.map((requestor, index) => {
      return (
        <ListItem key={requestor.id}>
          <Left>
            <Thumbnail source={{ uri: requestor.data.icon }} />
          </Left>
          <Body>
            <Text>{requestor.data.displayName}</Text>
          </Body>
          <Right>
            <Button onPress={() => this.acceptRequest(requestor, index)}>
              <Text>Yes</Text>
            </Button>
            <Button onPres={() => this.declineRequest(index)}>
              <Text>No</Text>
            </Button>
          </Right>
        </ListItem>
      );
    });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => alert(`You've been logged out.`))
      .then(() => this.props.navigation.navigate('LogIn'))
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
            <Text>Friend Requests</Text>
          </Separator>
          {this.state.requests.length ? (
            <List>{this.renderRequests()}</List>
          ) : (
            <Text>You have no pending requests.</Text>
          )}
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
                onPress={() => navigation.navigate('FriendRequests')}
              >
                <Text>View Friend Requests</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem last>
              <TouchableOpacity onPress={() => this.logout()}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </ListItem>
            {/* <ListItem last>
              <TouchableOpacity onPress={() => this.deleteUser()}>
                <Text>Delete account</Text>
              </TouchableOpacity>
            </ListItem> */}
          </List>
        </Content>
        <Navbar navigation={this.props.navigation} />
      </Container>
    );
  }
}

// async deleteUser() {
//   const convoDocs = this.state.userDoc.conversations;
//   let convos = {};
//   let convosArr = [];
//   for (let i = 0; i < convoDocs.length; i++) {
//     const convo = await db
//       .collection('conversations')
//       .doc(convoDocs[i])
//       .get();
//     convos[convo.id] = [];
//     convosArr.push(convo.id);
//   }
//   convosArr.forEach(async convo => {
//     const snapshot = await db
//       .collection('conversations')
//       .doc(convo)
//       .get();
//     const convoData = await snapshot.data();
//     const users = convoData.users;
//     users.forEach(user => convos[convo].push(user));
//     convos[convo].forEach(async user => {
//       const userDoc = await this.getUserDoc(user);
//       const oldConvos = userDoc.conversations;
//       const newConvos = oldConvos.filter(convoInArr => convoInArr !== convo);
//       db.collection('users')
//         .doc(user)
//         .set({ conversations: newConvos })
//         .then(() =>
//           console.log(
//             `User ${userDoc.id} no longer is part of convo ${convo}`
//           )
//         )
//         .catch(err => console.error(err));
//     });
//     db.collection('conversations')
//       .doc(convo)
//       .delete()
//       .then(() => console.log(`Convo ${convo} was deleted`))
//       .catch(err => console.error(err));
//   });
//   this.state.userRef
//     .delete()
//     .then(() => console.log(`User ${this.state.userRef.id} was deleted`))
//     .then(() => alert(`Your account was deleted.`))
//     .then(() => this.props.navigation.navigate('LogIn'))
//     .catch(err => console.error(err));
// }
