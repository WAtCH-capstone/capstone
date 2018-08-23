//FROM CONVOS:

// async getFirstMessage(id) {
//   const convo = await db
//     .collection('conversations')
//     .doc(id)
//     .get();
//   return convo.data().firstMessage;
// }

// async getFriend(id) {
//   const friendID = convo.users.find(id => id !== this.user.uid);
//   const friend = await db
//     .collection('users')
//     .doc(friendID)
//     .get();
//   return friend.data();
// }

//in render convos:
// const sorted = convos.sort(
//   (a, b) => a.firstMessage.createdAt - b.firstMessage.createdAt || 0
// );

// onSend(messages = []) {
//   let createdAt;
//   if (this.state.triggers.date.length) {
//     const date = new Date(this.state.triggers.date);
//     createdAt = date.getTime();
// const newMessage = {
//   _id: createdAt,
//   text: messages[0].text,
//   createdAt,
//   user: { _id: this.user.uid },
// };
//     schedule.scheduleJob(date, () => {
//       this.state.ref.collection('messages').add(newMessage);
//       this.state.ref.set({ firstMessage: newMessage }, { merge: true });
//     });
//   } else {
//     createdAt = new Date().getTime();
//     const newMessage = {
//       _id: createdAt,
//       text: messages[0].text,
//       createdAt,
//       user: { _id: this.user.uid },
//     };
//     this.state.ref.collection('messages').add(newMessage);
//     this.state.ref.set({ firstMessage: newMessage }, { merge: true });
//   }
// }

// renderHeader() {
//   if (this.state.friends.length === 1) {
//     const friend = this.state.friends[0];
//     return (
//       <React.Fragment>
//         <Left>
//           <Image source={{ uri: friend.icon }} style={styles.image} />
//         </Left>
//         <Body>
//           <Title>{friend.displayName}</Title>
//         </Body>
//         <Right>
//           <Button
//             transparent
//             onPress={() =>
//               this.props.navigation.navigate('SingleConvoPreferences', {
//                 setConvoPrefs: this.setConvoPrefs,
//                 id: this.state.id,
//                 friend,
//               })
//             }
//           >
//             <Image
//               source={require('../../public/buttons/preferences.png')}
//               style={styles.smallImage}
//             />
//           </Button>
//         </Right>
//       </React.Fragment>
//     );
//   } else {
//     return (
//       <React.Fragment>
//         {/* <Left>
//           <Image source={{ uri: friend.data.icon }} style={styles.image} />
//         </Left> */}
//         <Body>
//           <Title>Group Chat</Title>
//         </Body>
//         {/* <Right>
//           <Button
//             transparent
//             onPress={() =>
//               this.props.navigation.navigate('SingleConvoPreferences', {
//                 setConvoPrefs: this.setConvoPrefs,
//                 id: this.state.id,
//                 friend,
//               })
//             }
//           >
//             <Image
//               source={require('../../public/preferences.png')}
//               style={styles.smallImage}
//             />
//           </Button>
//         </Right> */}
//       </React.Fragment>
//     );
//   }
// }

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

// const styles = StyleSheet.create({
//   blueButton: {
//     marginTop: 5,
//   },
//   inputWrapper: {
//     marginTop: 10,
//   },
//   mapTextInput: {
//     height: 40,
//     width: 350,
//     borderWidth: 1,
//     paddingHorizontal: 16,
//   },
//   container: {
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: -50,
//   },
//   root: {
//     height: 40,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     justifyContent: 'center',
//   },
// });
