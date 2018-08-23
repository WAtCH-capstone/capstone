import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Button, Footer } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import key from '../../googleMaps';
import schedule from 'node-schedule';
import db from '../../firestore';
import firebase from 'firebase';
import Navbar from './Navbar';
import styles from './Styles';
const geodist = require('geodist');
// const timer = require('react-native-timer');

export default class MessagePreferences extends React.Component {
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
    this.timeoutID = null;
  }

  componentDidMount() {
    const ref = this.getRef(this.props.navigation.state.params.id);
    this.setState({ ref });
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

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
      this.setState(
        {
          distanceFromAtoB: dist,
        },
        () => {
          console.log('distance from a to b', dist);
        }
      );
    }
  }

  getRef(id) {
    return db.collection('conversations').doc(id);
  }

  setTrigger(date) {
    const time = this.dateToTime(date);
    const timeArr = date.toString().split(' ');
    const displayTime =
      timeArr[0] + ' ' + timeArr[1] + ' ' + timeArr[2] + ' at ' + time;
    this.setState({ triggers: { date }, displayTime });
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

  dateToTime(date) {
    let dateArr = date.toString().split(' ');
    let [hour, minute, second] = dateArr[4]
      .split(':')
      .map(str => parseInt(str));
    if (hour > 12) {
      hour = hour - 12;
      if (minute < 10) return `${hour}:0${minute} pm`;
      else return `${hour}:${minute} pm`;
    } else {
      if (minute < 10) return `${hour}:0${minute} am`;
      else return `${hour}:${minute} am`;
    }
  }

  async onSend() {
    if (this.state.locationTrigger) {
      let createdAt;
      const date = new Date();
      createdAt = date.getTime();
      const docID = createdAt.toString();

      const newMessage = {
        _id: createdAt,
        text: this.props.navigation.state.params.messageContent,
        createdAt,
        user: { _id: this.props.navigation.state.params.user.uid },
      };
      db.collection('users')
        .doc(this.user.uid)
        .collection('scheduled')
        .doc(docID)
        .set({
          newMessage,
          convoID: this.props.navigation.state.params.id,
        });
      this.interval = setInterval(() => {
        if (this.state.locationDetails) {
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
          if (this.state.currentLat && this.state.currentLong) {
            this.getDistanceFromDestination();
            if (this.state.distanceFromAtoB < 502) {
              this.state.ref.collection('messages').add(newMessage);
              this.state.ref.set({ firstMessage: newMessage }, { merge: true });
              db.collection('users')
                .doc(this.user.uid)
                .collection('scheduled')
                .doc(docID)
                .delete();
              clearInterval(this.interval);
            }
          }
        }
      }, 1000);
      // testing afte 20 seconds uncomment to check.
      this.timeoutID = setTimeout(() => {
        this.setState({
          currentLat: 40.7051,
          currentLong: -74.0092, // fullstack coords for testing after 20 seconds!
        });
      }, 20000);
    } else {
      let createdAt;
      const date = new Date(this.state.triggers.date);
      const current = new Date();
      if (date < current) {
        alert('Oops, that time has already passed.');
        return;
      }
      createdAt = date.getTime();
      const docID = createdAt.toString();
      const newMessage = {
        _id: createdAt,
        text: this.props.navigation.state.params.messageContent,
        createdAt,
        user: {
          _id: this.props.navigation.state.params.user.uid,
          name: this.props.navigation.state.params.userData.displayName,
          avatar: this.props.navigation.state.params.userData.icon,
        },
      };
      db.collection('users')
        .doc(this.user.uid)
        .collection('scheduled')
        .doc(docID)
        .set({
          newMessage,
          convoID: this.props.navigation.state.params.id,
        });
      schedule.scheduleJob(date, () => {
        this.state.ref.collection('messages').add(newMessage);
        this.state.ref.set({ firstMessage: newMessage }, { merge: true });
        db.collection('users')
          .doc(this.user.uid)
          .collection('scheduled')
          .doc(docID)
          .delete();
      });
    }
    alert('Your message has been scheduled!');
    this.props.navigation.navigate('ScheduledMessages');
  }

  render() {
    const { isDateTimePickerVisible, triggers, displayTime } = this.state;
    return (
      <View>
        <View style={styles.noneContainer}>
          <Text style={styles.nonePref}>
            {this.props.navigation.state.params.messageContent}
          </Text>
          {triggers.date ? (
            <Text style={styles.noneSmall}>{displayTime}</Text>
          ) : null}
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
          <DateTimePicker
            mode="datetime"
            isVisible={isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          {this.state.textInput ? (
            <Text style={styles.noneSmall}>{this.state.textInput}</Text>
          ) : null}
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
                    // onChangeText={() => {
                    //   handleTextChange;
                    //   this.setState({ showResults: true });
                    // }}
                    clearButtonMode
                    onChangeText={handleTextChange}
                    value={this.state.textInput}
                  />
                </View>
                {isSearching && <ActivityIndicator />}
                {/* {this.state.showResults === true ? ( */}
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
                {/* ) : null} */}
              </React.Fragment>
            )}
          </GoogleAutoComplete>
          <Button
            style={styles.blueButton}
            full
            rounded
            primary
            onPress={() => this.onSend()}
          >
            <View>
              <Text style={{ color: 'white' }}>Submit Message</Text>
            </View>
          </Button>
        </View>
      </View>
    );
  }
}

console.disableYellowBox = true;
