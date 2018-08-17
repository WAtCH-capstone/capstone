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

export default class MessagePreferences extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      isDateTimePickerVisible: false,
      // selectedDate: '',
      locationDetails: '',
      textInput: '',
      showResults: true,
      ref: '',
      triggers: {
        date: '',
      },
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
    return (
      <View style={{ backgroundColor: 'white', paddingBottom: 600 }}>
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
