import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: function(notifcation) {
        console.log('Notification:', notifcation);
      },
    });
  }

  render() {
    return null;
  }
}
