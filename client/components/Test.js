import React from 'react';
const geodist = require('geodist');

export default class GeoLocator extends React.Component {
  constructor() {
    super();
    this.state = {
      initialLat: null,
      initialLong: null,
      error: null,
      distanceLeft: '',
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        // const initialPosition = JSON.stringify(position);
        this.setState(
          {
            initialLat: position.coords.latitude,
            initialLong: position.coords.longitude,
          },
          () => {
            console.log('this.state', this.state);
            const dist = geodist(
              { lat: this.state.initialLat, long: this.state.initialLong },
              { lat: 40.7484, long: -73.9857 },
              { format: true, unit: 'miles' }
            );
            console.log('dis from A to B', dist);
          }
        );
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return <div />;
  }
}

console.disableYellowBox = true;
