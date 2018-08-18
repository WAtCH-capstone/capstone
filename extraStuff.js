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
