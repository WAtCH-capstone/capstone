import React, { Component } from 'react';
import {
  Container,
  Content,
  Separator,
  List,
  ListItem,
  Text,
  Picker,
  Right,
  Left,
  Button,
  Switch,
} from 'native-base';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import db from '../../firestore';
import firebase from 'firebase';
import styles from './Styles';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import key from '../../googleMaps';

export default class SingleConvoPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'key1',
      startTimePicker: false,
      endTimePicker: false,
      startTime: '',
      endTime: '',
      prefs: {
        startTimes: [],
        endTimes: [],
      },
      locationDetails: '',
      textInput: '',
      locationTrigger: false,
    };
    this.deleteTime = this.deleteTime.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  async componentDidMount() {
    const uid = await firebase.auth().currentUser.uid;
    const prefRef = `${uid}-prefs`;
    const convoRef = await db
      .collection('conversations')
      .doc(this.props.navigation.state.params.id)
      .get();
    const data = convoRef.data()[prefRef];
    this.setState({
      prefs: {
        startTimes: data.startTimes,
        endTimes: data.endTimes,
        // location: data.location,
      },
    });
  }
  _handlePress = async (el, fetchDetails) => {
    const res = await fetchDetails(el.place_id);
    this.setState({
      locationDetails: res,
      textInput: el.description,
      locationTrigger: true, //set at true for now
    });
  };
  async onSend() {
    if (this.state.locationTrigger) {
    }
  }
  async onValueChange() {
    await this.setState({ selected: value });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideStartTimePicker = () => this.setState({ startTimePicker: false });

  _hideEndTimePicker = () => this.setState({ endTimePicker: false });

  _startTimePicked = async date => {
    const time = this.dateToTime(date);
    await this.setState(prevState => ({
      prefs: {
        ...prevState.prefs,
        startTimes: [...prevState.prefs.startTimes, { date, time }],
      },
    }));
    this._hideStartTimePicker();
  };

  _endTimePicked = async date => {
    const time = this.dateToTime(date);
    await this.setState(prevState => ({
      prefs: {
        ...prevState.prefs,
        endTimes: [...prevState.prefs.endTimes, { date, time }],
      },
    }));
    this._hideEndTimePicker();
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

  async deleteTime(index) {
    await this.setState(prevState => {
      prevState.prefs.startTimes.splice(index, 1);
      prevState.prefs.endTimes.splice(index, 1);
      return {
        prefs: {
          ...prevState.prefs,
          startTimes: prevState.prefs.startTimes,
          endTimes: prevState.prefs.endTimes,
        },
      };
    });
  }

  renderTimes() {
    const startTimes = this.state.prefs.startTimes;
    const endTimes = this.state.prefs.endTimes;
    if (!startTimes.length && !endTimes.length) {
      return <Text style={styles.noneSmall1}>Off</Text>;
    }
    return startTimes.map((el, ind) => {
      if (!endTimes[ind]) {
        return (
          <ListItem>
            <Left>
              <Text>{startTimes[ind].time} - </Text>
            </Left>
          </ListItem>
        );
      }
      if (!startTimes[ind]) {
        return (
          <ListItem>
            <Left>
              <Text> - {endTimes[ind].time}</Text>
            </Left>
          </ListItem>
        );
      }
      return (
        <ListItem>
          <Left>
            <Text>
              {startTimes[ind].time} - {endTimes[ind].time}
            </Text>
          </Left>
          <Right>
            <Button onPress={() => this.deleteTime(ind)}>
              <Text>X</Text>
            </Button>
          </Right>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content>
          {/* <List>
            <ListItem style={{ marginTop: 20, marginBottom: 20 }}>
              <Left>
                <Text style={styles.noneSmall1}>
                  Share location with{' '}
                  {this.props.navigation.state.params.friend.displayName}
                </Text>
              </Left>
              <Right>
                <TouchableOpacity>
                  <Switch onValueChange={this.onValueChange.bind(this)} />
                </TouchableOpacity>
              </Right>
            </ListItem>
          </List> */}
          <Text style={styles.noneSmall1}>Do Not Disturb:</Text>
          <List>
            {this.renderTimes()}
            <ListItem>
              <Left>
                <Button
                  style={{ marginTop: 10, marginLeft: 10, marginBottom: 20 }}
                  full
                  rounded
                  primary
                  onPress={() => this.setState({ startTimePicker: true })}
                >
                  <Text style={{ color: 'white' }}>Add Start Time</Text>
                  <DateTimePicker
                    mode="time"
                    isVisible={this.state.startTimePicker}
                    onConfirm={this._startTimePicked}
                    onCancel={this._hideStartTimePicker}
                  />
                </Button>
                <Button
                  style={{ marginTop: 10, marginLeft: 40 }}
                  full
                  rounded
                  primary
                  onPress={() => this.setState({ endTimePicker: true })}
                >
                  <Text style={{ color: 'white' }}>Add End Time</Text>
                </Button>
                <DateTimePicker
                  mode="time"
                  isVisible={this.state.endTimePicker}
                  onConfirm={this._endTimePicked}
                  onCancel={this._hideEndTimePicker}
                />
              </Left>
            </ListItem>
          </List>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.props.navigation.state.params.setConvoPrefs(
                this.state.prefs
              );
              this.props.navigation.navigate('SingleConvo', {
                id: this.props.navigation.state.params.id,
                friend: this.props.navigation.state.params.friend,
              });
            }}
          >
            <Text style={{ color: 'white' }}>Save preferences</Text>
          </Button>
          {/* this will be for location */}
          {/* <View style={styles.container}>
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
                    {/* {console.log('locationResults', locationResults)} */}
          {/* {locationResults.map(el => (
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
          </View> */}
        </Content>
      </Container>
    );
  }
}

console.disableYellowBox = true;
