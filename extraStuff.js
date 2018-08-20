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
