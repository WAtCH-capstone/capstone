import React, { Component } from 'react';
import {
  Container,
  Form,
  Input,
  Item,
  Button,
  Label,
  Text,
  Separator,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  View,
} from 'native-base';
import db from '../../firestore';
import firebase from 'firebase';
import styles from './Styles';

// Need to have a way to check if that conversation already exists

export default class CreateConvo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      recipients: [],
      email: '',
      userDoc: {},
      userRef: '',
    };
    this.createNewConvo = this.createNewConvo.bind(this);
  }

  async componentDidMount() {
    const uid = await firebase.auth().currentUser.uid;
    const userData = await this.getUserDoc(uid);
    const friends = await this.getFriends(userData.friends);
    this.setState({
      userDoc: userData,
      userRef: firebase.auth().currentUser,
      friends,
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

  async getFriends(friendArr) {
    let friends = [];
    for (let id of friendArr) {
      const user = await db
        .collection('users')
        .doc(id)
        .get();
      const data = await user.data();
      const objToAdd = { id, data };
      friends.push(objToAdd);
    }
    return friends;
  }

  async createNewConvo(recipientArr) {
    const currUserId = this.state.userRef.uid;
    const currUserRef = db.collection('users').doc(currUserId);
    const participants = recipientArr.map(el => el.id);
    participants.push(currUserId);
    db.collection('conversations')
      .add({
        users: participants,
      })
      .then(docRef => {
        currUserRef.update({
          conversations: firebase.firestore.FieldValue.arrayUnion(docRef.id),
        });
        for (let friend of recipientArr) {
          db.collection('users')
            .doc(friend.id)
            .set(
              { conversations: [...friend.data.conversations, docRef.id] },
              { merge: true }
            );
        }
        return docRef.id;
      })
      .then(id =>
        this.props.navigation.navigate('SingleConvo', {
          id,
          friends: recipientArr,
        })
      )
      .catch(err => console.error(err));
  }

  async sendFriendRequest(email) {
    const currUserId = await firebase.auth().currentUser.uid;
    const friendQuery = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    const friendArr = friendQuery.docs.map(friend => friend.data());
    const friend = friendArr[0];
    const friendRef = db.collection('users').doc(friendQuery.docs[0].id);
    friendRef.set(
      { requests: [...friend.requests, currUserId] },
      { merge: true }
    );
    alert('Friend request sent!');
  }

  addToConvo(friend, index) {
    this.setState(prevState => {
      prevState.friends.splice(index, 1);
      return {
        friends: prevState.friends,
        recipients: [...prevState.recipients, friend],
      };
    });
  }

  removeFromConvo(friend, index) {
    this.setState(prevState => {
      prevState.recipients.splice(index, 1);
      return {
        recipients: prevState.recipients,
        friends: [...prevState.friends, friend],
      };
    });
  }

  renderRecipients() {
    return this.state.recipients.map((friend, index) => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 20,
            marginBottom: 10,
          }}
          key={friend.id}
        >
          <View style={{ backgroundColor: 'white', width: 70 }}>
            <Thumbnail source={{ uri: friend.data.icon }} />
          </View>
          <View style={{ backgroundColor: 'white', width: 135 }}>
            <Text style={styles.noneSmall1}>{friend.data.displayName}</Text>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <Button
              style={styles.removeButton}
              danger
              onPress={() => this.removeFromConvo(friend, index)}
            >
              <Text>Remove</Text>
            </Button>
          </View>
        </View>
      );
    });
  }

  renderFriends() {
    return this.state.friends.map((friend, index) => {
      return (
        // <ListItem key={friend.id}>
        //   <Left>
        //     <Thumbnail source={{ uri: friend.data.icon }} />
        //   </Left>
        //   <Body>
        //     <Text>{friend.data.displayName}</Text>
        //   </Body>
        //   <Right>
        //     <Button onPress={() => this.addToConvo(friend, index)}>
        //       <Text>Add</Text>
        //     </Button>
        //   </Right>
        // </ListItem>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 20,
            marginBottom: 10,
          }}
          key={friend.id}
        >
          <View style={{ backgroundColor: 'white', width: 70 }}>
            <Thumbnail source={{ uri: friend.data.icon }} />
          </View>
          <View style={{ backgroundColor: 'white', width: 170 }}>
            <Text style={styles.noneSmall1}>{friend.data.displayName}</Text>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <Button
              style={styles.yesButton}
              success
              onPress={() => this.addToConvo(friend, index)}
            >
              <Text>Add</Text>
            </Button>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ backgroundColor: 'white' }}>
            <Text style={styles.title}>Recipients</Text>
          </View>
          {this.state.recipients.length ? (
            <List>{this.renderRecipients()}</List>
          ) : (
            <Text style={styles.noneSmall1}>No friends added.</Text>
          )}
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.createNewConvo(this.state.recipients);
            }}
          >
            <Text style={{ color: 'white' }}>Start Conversation</Text>
          </Button>
          <View style={{ backgroundColor: 'white' }}>
            <Text style={styles.title}>Friends</Text>
          </View>
          {this.state.friends.length ? (
            <List>{this.renderFriends()}</List>
          ) : (
            <View>
              <Text style={styles.noneSmall1}>You have no friends yet.</Text>
              <Text style={styles.noneSmall1}>
                Press "Add Friend" to start adding friends!
              </Text>
            </View>
          )}
          <Form>
            <Item floatingLabel>
              <Label>Recipient E-mail</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                clearButtonMode="always"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Button
              style={{ marginTop: 15 }}
              primary
              full
              rounded
              onPress={() => {
                this.sendFriendRequest(this.state.email);
              }}
            >
              <Text style={{ color: 'white' }}>Add Friend</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
