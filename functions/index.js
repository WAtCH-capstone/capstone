const functions = require('firebase-functions');
const schedule = require('node-schedule');
const db = require('../firestore');

exports.trigger = functions.firestore
  .document(`triggers/{triggerID}`)
  .onCreate((snap, context) => {
    console.log('context var', context);
    const trigger = snap.data();
    if (trigger.time) {
      schedule.scheduleJob('second minute hour day month', () =>
        db
          .collection('conversations')
          .doc(conversationID)
          .collection('messages')
          .add(newMessage)
      );
    }
  });
