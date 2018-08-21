import React from 'react';
import RootNavigator from './RootNavigator';
import InAppNotification from './client/components/InAppNotification';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <RootNavigator />
        <InAppNotification />
      </React.Fragment>
    );
  }
}
