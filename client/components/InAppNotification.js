import React from 'react';
import { Container } from 'native-base';
import styles from './Styles';
import AwesomeAlert from 'react-native-awesome-alerts';
import db from '../../firestore';
import firebase from 'firebase';

export default class InAppNotification extends React.Component {
  constructor() {
    super();
    this.state = { newText: [], displayAlert: false };
    this.user = firebase.auth().currentUser;
    this.getUserData = this.getUserData.bind(this);
    this.listenToConvos = this.listenToConvos.bind(this);
    this.listenToUser = this.listenToUser.bind(this);
  }

  async componentDidMount() {
    this.listenToConvos();
    this.listenToUser();
  }

  async getUserData() {
    const snapshot = await db
      .collection('users')
      .doc(this.user.uid)
      .get();
    return snapshot.data();
  }

  async setNewText(userData) {
    let newText = [];
    for (let id of userData.conversations) {
      const convoData = await this.getData(id);
      const firstMessage = convoData.firstMessage;
      const friend = convoData.friend;
      newText.push({ id, firstMessage, friend });
    }
    this.setState({ newText, displayAlert: true });
  }

  async listenToConvos() {
    let userData = await this.getUserData();
    for (let id of userData.conversations) {
      this.unsubscribe = await db
        .collection('conversations')
        .doc(id)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .onSnapshot(async () => {
          let userData = await this.getUserData();
          this.setNewText(userData);
        });
    }
  }

  async listenToUser() {
    this.userListener = await db
      .collection('users')
      .doc(this.user.uid)
      .onSnapshot(snap => {
        this.setNewText(snap.data());
      });
  }

  hideAlert() {
    this.setState({
      displayAlert: false,
      newText: [],
    });
  }

  render() {
    const newText = this.state.newText;
    const displayAlert = this.state.displayAlert;
    if (displayAlert) {
      return (
        <AwesomeAlert
          show={displayAlert}
          showProgress={false}
          title={`Message from ${newText.friend}`}
          message={newText.firstMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Not now"
          confirmText="View"
          confirmButtonColor="#aaa"
          cancelButtonColor="#aaa"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.props.navigation.navigate('SingleConvo', {
              id: this.state.newText.id,
              friend: this.state.newText.friend,
            });
          }}
        />
      );
    } else return null;
  }
}
