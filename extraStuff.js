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
