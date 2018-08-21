import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import db from '../../firestore';
import firebase from 'firebase';

export default class InAppNotification extends React.Component {
  constructor() {
    super();
    this.state = { newText: {}, displayAlert: false };
    // this.user = firebase.auth().currentUser;
    this.getUserData = this.getUserData.bind(this);
    this.listenToConvos = this.listenToConvos.bind(this);
    this.listenToUser = this.listenToUser.bind(this);
  }

  async componentDidMount() {
    // this.setState({
    //   newText: {
    //     _id: 1534792009096,
    //     createdAt: 1534792009096,
    //     text: 'Hi!',
    //     user: {
    //       _id: 'G0biB6fiC5Yzrty1eTrQKmOgKL12',
    //       avatar:
    //         'https://cdn.shopify.com/s/files/1/1061/1924/files/Nerd_with_Glasses_Emoji.png?9898922749706957214',
    //       name: 'Hadley',
    //     },
    //   },
    //   displayAlert: true,
    // });
    this.listenToConvos();
    this.listenToUser();
  }

  async getUserData() {
    const user = firebase.auth().currentUser;
    console.log('user: ', user);
    const snapshot = await db
      .collection('users')
      .doc(user.uid)
      .get();
    return snapshot.data();
  }

  async setNewText(userData) {
    let newText = {};
    for (let id of userData.conversations) {
      const convoData = await this.getData(id);
      console.log('convoData: ', convoData);
      newText = convoData.firstMessage;
      console.log('newText: ', newText);
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
          console.log('userData: ', userData);
          this.setNewText(userData);
        });
    }
  }

  async listenToUser() {
    const user = firebase.auth().currentUser;
    console.log('user: ', user);
    this.userListener = await db
      .collection('users')
      .doc(user.uid)
      .onSnapshot(snap => {
        this.setNewText(snap.data());
        console.log('snap.data(): ', snap.data());
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
          title={`Message from ${newText.user ? newText.user.name : null}`}
          message={newText.text ? newText.text : null}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Not now"
          confirmText="View"
          confirmButtonColor="#3B80FE"
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
