import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import key from '../../googleMaps';
import schedule from 'node-schedule';
import db from '../../firestore';
import firebase from 'firebase';
import Navbar from './Navbar';
const geodist = require('geodist');
// const timer = require('react-native-timer');
//
export default class MessagePreferences extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      isDateTimePickerVisible: false,
      locationDetails: '',
      textInput: '',
      showResults: true,
      ref: '',
      triggers: {
        date: '',
      },
      distanceFromAtoB: '',
      currentLat: null,
      currentLong: null,
      error: null,
      showMsg: false,
      locationTrigger: false,
    };
    this.setTrigger = this.setTrigger.bind(this);
    this._handleDatePicked = this._handleDatePicked.bind(this);
    this._handlePress = this._handlePress.bind(this);
    this.onSend = this.onSend.bind(this);
    this.user = firebase.auth().currentUser;
    this.getDistanceFromDestination = this.getDistanceFromDestination.bind(
      this
    );
  }

  componentDidMount() {
    const ref = this.getRef(this.props.navigation.state.params.id);
    this.setState({ ref });
    // setInterval(() => {
    //   this.watchId = navigator.geolocation.watchPosition(
    //     position => {
    //       // const initialPosition = JSON.stringify(position);
    //       this.setState({
    //         currentLat: position.coords.latitude,
    //         currentLong: position.coords.longitude,
    //       });
    //     },
    //     error => this.setState({ error: error.message }),
    //     {
    //       enableHighAccuracy: true,
    //       timeout: 20000,
    //       maximumAge: 1000,
    //       distanceFilter: 10,
    //     }
    //   );
    //   if (this.state.currentLat && this.state.currentLong) {
    //     this.getDistanceFromDestination();
    //     if (this.state.distanceFromAtoB < 502) {
    //       this.onSend();
    //     } else {
    //       console.log('msg will not get sent');
    //     }
    //   }
    // }, 10000);
  }
  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }

  getDistanceFromDestination() {
    if (this.state.locationDetails.hasOwnProperty('geometry')) {
      const dist = geodist(
        { lat: this.state.currentLat, long: this.state.currentLong },
        {
          lat: this.state.locationDetails.geometry.location.lat,
          long: this.state.locationDetails.geometry.location.lng,
        },
        { unit: 'feet' }
      );
      // console.log('first coord', this.state.locationDetails.geometry.location.lat);
      // this.setState({ distanceFromAtoB: dist });
      console.log(typeof dist);
      console.log('distance from current to destination: ', dist);
      this.setState({
        distanceFromAtoB: dist,
      });
    }
  }

  getRef(id) {
    return db.collection('conversations').doc(id);
  }

  setTrigger(date) {
    this.setState({ triggers: { date } });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    // this.setState({ triggers: { date: date.toString() } });
    this.setTrigger(date.toString());
    this._hideDateTimePicker();
  };

  _handlePress = async (el, fetchDetails) => {
    const res = await fetchDetails(el.place_id);
    this.setState({
      locationDetails: res,
      textInput: el.description,
      showResults: false,
      locationTrigger: !this.state.locationTrigger,
    });
  };

  async onSend() {
    // checking current coordinates and send based on whether user is within 0.1 miles
    if (this.state.locationTrigger) {
      let createdAt;
      const date = new Date();
      createdAt = date.getTime();
      const newMessage = {
        _id: createdAt,
        text: this.props.navigation.state.params.messageContent,
        createdAt,
        user: { _id: this.props.navigation.state.params.user.uid },
      };
      db.collection('users')
        .doc(this.user.uid)
        .collection('scheduled')
        .add({ newMessage, convoID: this.props.navigation.state.params.id });

      this.interval = setInterval(() => {
        if (this.state.locationDetails) {
          console.log('i am here');
          this.watchId = navigator.geolocation.watchPosition(
            position => {
              this.setState({
                currentLat: position.coords.latitude,
                currentLong: position.coords.longitude,
              });
            },
            error => this.setState({ error: error.message }),
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
              distanceFilter: 10,
            }
          );
          console.log(
            'current coords,',
            this.state.currentLong,
            this.state.currentLat
          );
          if (this.state.currentLat && this.state.currentLong) {
            this.getDistanceFromDestination();
            console.log(this.state.distanceFromAtoB);
            if (this.state.distanceFromAtoB < 502) {
              console.log('message will get sent');
              this.state.ref.collection('messages').add(newMessage);
              this.state.ref.set({ firstMessage: newMessage }, { merge: true });
              clearInterval(this.interval);
            } else {
              console.log('msg will not get sent');
            }
          }
        }
      }, 1000);
    } else {
      let createdAt;
      const date = new Date(this.state.triggers.date);
      createdAt = date.getTime();
      const newMessage = {
        _id: createdAt,
        text: this.props.navigation.state.params.messageContent,
        createdAt,
        user: { _id: this.props.navigation.state.params.user.uid },
      };
      db.collection('users')
        .doc(this.user.uid)
        .collection('scheduled')
        .add({ newMessage, convoID: this.props.navigation.state.params.id });
      schedule.scheduleJob(date, () => {
        this.state.ref.collection('messages').add(newMessage);
        this.state.ref.set({ firstMessage: newMessage }, { merge: true });
      });
    }
  }

  render() {
    const { isDateTimePickerVisible, triggers } = this.state;
    // testing:
    // const newLat = 40.766291;
    // const newLng = -73.923729;
    // setTimeout(() => {
    //   this.setState(
    //     {
    //       locationDetails: {
    //         geometry: { location: { lat: newLat + 1, lng: newLng + 1 } },
    //       },
    //     },
    //     () => {
    //       console.log(
    //         'time out after 5 seconds',
    //         this.state.locationDetails.geometry.location
    //       );
    //     }
    //   );
    // }, 5000);
    return (
      <View>
        <View style={{ backgroundColor: 'white', paddingBottom: 540 }}>
          <View>
            <Button
              style={styles.blueButton}
              full
              rounded
              primary
              onPress={this._showDateTimePicker}
            >
              <View>
                <Text style={{ color: 'white' }}>Pick a Date and Time</Text>
              </View>
            </Button>
            <Text>{triggers.date}</Text>
            <DateTimePicker
              mode="datetime"
              isVisible={isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
          <View style={styles.container}>
            <GoogleAutoComplete apiKey={key} debounce={500} minLength={0}>
              {({
                handleTextChange,
                locationResults,
                fetchDetails,
                isSearching,
              }) => (
                <React.Fragment>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.mapTextInput}
                      placeholder="Enter a Location..."
                      onChangeText={handleTextChange}
                      value={this.state.textInput}
                    />
                  </View>
                  {isSearching && <ActivityIndicator />}
                  <ScrollView>
                    {locationResults.map(el => (
                      <TouchableOpacity
                        key={el.id}
                        style={styles.root}
                        onPress={() => this._handlePress(el, fetchDetails)}
                      >
                        <Text>{el.description}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </React.Fragment>
              )}
            </GoogleAutoComplete>
            <Text>{this.state.textInput}</Text>
            <Button
              style={styles.blueButton}
              full
              rounded
              primary
              onPress={() =>
                this.onSend()
                  .then(() => {
                    alert('Your message has been scheduled!');
                    this.props.navigation.navigate('ScheduledMessages');
                  })
                  .catch(err => console.error(err))
              }
            >
              <View>
                <Text style={{ color: 'white' }}>Submit</Text>
              </View>
            </Button>
          </View>
        </View>
        <Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blueButton: {
    marginTop: 5,
  },
  inputWrapper: {
    marginTop: 10,
  },
  mapTextInput: {
    height: 40,
    width: 350,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: -50,
  },
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
});
