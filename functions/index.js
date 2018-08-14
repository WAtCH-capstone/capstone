const functions = require('firebase-functions');

exports.onSend = functions.firestore
  .document('conversations/{convoID}/messages/{messageID}')
  .onCreate((snap, context) => {
    console.log(snap.data(), context);
  });
