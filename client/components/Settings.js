import React from 'react';
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
  View,
} from 'native-base';
import Navbar from './Navbar';
import db from '../../firestore';
import firebase from 'firebase';
import styles from './Styles';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = { userDoc: {}, userRef: '', requests: [] };
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
    const uid = await firebase.auth().currentUser.uid;
    this.state.userDoc.requests.splice(index, 1);
    await db
      .collection('users')
      .doc(this.state.userRef.uid)
      .set(
        {
          friends: [...this.state.userDoc.friends, requestor.id],
          requests: this.state.userDoc.requests,
        },
        { merge: true }
      );
    await db
      .collection('users')
      .doc(requestor.id)
      .set({ friends: [...requestor.data.friends, uid] }, { merge: true });
    await this.setState(prevState => {
      prevState.requests.splice(index, 1);
      return {
        requests: prevState.requests,
        userDoc: {
          ...prevState.userDoc,
          friends: [...prevState.userDoc.friends, requestor.id],
        },
      };
    });
    alert(
      `You and ${
        requestor.data.displayName
      } are now friends. Send them a message!`
    );
  }

  async declineRequest(index) {
    this.state.userDoc.requests.splice(index, 1);
    await this.state.userRef.set(
      { requests: this.state.userDoc },
      { merge: true }
    );
    await this.setState(prevState => {
      prevState.requests.splice(index, 1);
      return {
        requests: prevState.requests,
      };
    });
  }

  renderRequests() {
    return this.state.requests.map((requestor, index) => {
      return (
        // <ListItem key={requestor.id}>
        //   <Left>
        //     <Thumbnail source={{ uri: requestor.data.icon }} />
        //   </Left>
        //   <Body>
        //     <Text>{requestor.data.displayName}</Text>
        //   </Body>
        //   <Right>
        //     <Button onPress={() => this.acceptRequest(requestor, index)}>
        //       <Text>Yes</Text>
        //     </Button>
        //     <Button onPres={() => this.declineRequest(index)}>
        //       <Text>No</Text>
        //     </Button>
        //   </Right>
        // </ListItem>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 20,
            marginBotton: 10,
          }}
          key={requestor.id}
        >
          <View style={{ backgroundColor: 'white', width: 70 }}>
            <Thumbnail source={{ uri: requestor.data.icon }} />
          </View>
          <View style={{ backgroundColor: 'white', width: 110 }}>
            <Text style={styles.noneSmall1}>{requestor.data.displayName}</Text>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <Button
              style={styles.yesButton}
              success
              onPress={() => this.acceptRequest(requestor, index)}
            >
              <Text>Yes</Text>
            </Button>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <Button
              style={styles.noButton}
              danger
              onPress={() => this.declineRequest(index)}
            >
              <Text>No</Text>
            </Button>
          </View>
        </View>
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
          <View>
            <Text style={styles.titleSmall}>My Profile</Text>
          </View>
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
          <View>
            <Text style={styles.titleSmall}>Friend Requests</Text>
          </View>
          {this.state.requests.length ? (
            <List>{this.renderRequests()}</List>
          ) : (
            <Text style={styles.noneSmall1}>You have no pending requests.</Text>
          )}
          <View>
            <Text style={styles.titleSmall}>Options</Text>
          </View>
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

console.disableYellowBox = true;
