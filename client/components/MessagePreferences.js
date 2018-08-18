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
      distanceLeft: '',
      showMsg: false,
    };
    this.setTrigger = this.setTrigger.bind(this);
    this._handleDatePicked = this._handleDatePicked.bind(this);
    this._handlePress = this._handlePress.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    const ref = this.getRef(this.props.navigation.state.params.id);
    this.setState({ ref });
  }

  getDistanceFromDestination() {}

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
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
    this.setTrigger(date.toString());
    this._hideDateTimePicker();
  };

  _handlePress = async (el, fetchDetails) => {
    const res = await fetchDetails(el.place_id);
    this.setState({
      locationDetails: res,
      textInput: el.description,
      showResults: false,
    });
  };

  onSend() {
    if (this.state.locationDetails) {
    }
    let createdAt;
    const date = new Date(this.state.triggers.date);
    createdAt = date.getTime();
    const newMessage = {
      _id: createdAt,
      text: this.props.navigation.state.params.messageContent,
      createdAt,
      user: { _id: this.props.navigation.state.params.user.uid },
    };
    schedule.scheduleJob(date, () => {
      this.state.ref.collection('messages').add(newMessage);
      this.state.ref.set({ firstMessage: newMessage }, { merge: true });
    });
  }

  render() {
    const { isDateTimePickerVisible, triggers } = this.state;

    this.watchId = navigator.geolocation.watchPosition(
      position => {
        // const initialPosition = JSON.stringify(position);
        this.setState(
          {
            currentLat: position.coords.latitude,
            currentLong: position.coords.longitude,
          },
          () => {
            console.log('this.state', this.state);
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
      if (dist <= 528) {
        // less than a foot
        console.log('true!');
      }
    }

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
              onPress={() => this.onSend()}
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
