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
import Navbar from './Navbar';

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
  }

  // componentDidMount() {
  //   // get times from DB
  // }

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

  renderTimes() {
    return this.state.prefs.times.map(el => (
      <ListItem>
        <Text>{el.time}</Text>
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
                <Text>Location sharing</Text>
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
                <Text style={{ color: 'white' }}>Set Receipt Times</Text>
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
            onPress={() =>
              this.props.navigation.state.params.setConvoPrefs(this.state.prefs)
            }
          >
            <Text style={{ color: 'white' }}>Save preferences</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
