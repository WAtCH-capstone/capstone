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
import { TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import db from '../../firestore';
import firebase from 'firebase';

export default class SingleConvoPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'key1',
      isDateTimePickerVisible: false,
      prefs: {
        times: [],
        location: '',
      },
    };
    this.prefRef = `${firebase.auth().currentUser.uid}-pref`;
  }

  async componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    const prefRef = `${uid}-prefs`;
    const convoRef = await db
      .collection('conversations')
      .doc(this.props.navigation.state.params.id)
      .get();
    console.log(convoRef.data());
    const data = convoRef.data()[this.prefRef];
    console.log(data);
    this.setState({ prefs: { times: data.times, location: data.location } });
  }

  async onValueChange() {
    await this.setState({ selected: value });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = async date => {
    const time = this.dateToTime(date);
    await this.setState(prevState => ({
      prefs: {
        ...prevState.prefs,
        times: [...prevState.prefs.times, { date, time }],
      },
    }));
    this._hideDateTimePicker();
  };

  dateToTime(date) {
    let dateArr = date.toString().split(' ');
    console.log(dateArr[4]);
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

  async deleteTime() {
    // const convoRef = await db.collection('conversations').doc(this.props.navigation.state.params.id).get()
    // const times = convoRef.data()[this.prefRef].times
    console.log('this will delete a time from the db');
  }

  renderTimes() {
    if (!this.state.prefs.times.length) {
      return <Text>Messages welcome anytime!</Text>;
    }
    return this.state.prefs.times.map(el => (
      <ListItem>
        <Text>{el.time}</Text>
        <Right onPress={this.deleteTime}>
          <Text>Delete</Text>
        </Right>
      </ListItem>
    ));
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Left>
                <Text>
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
            <ListItem>
              <Button
                style={{ marginTop: 10 }}
                full
                rounded
                primary
                onPress={() => this.setState({ isDateTimePickerVisible: true })}
              >
                <Text style={{ color: 'white' }}>Add Receipt Times</Text>
              </Button>
              <DateTimePicker
                mode="time"
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </ListItem>
          </List>
          <List>{this.renderTimes()}</List>
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
        </Content>
      </Container>
    );
  }
}
