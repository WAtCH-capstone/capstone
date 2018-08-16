// import React from "react";
// import { Container, Header, Content, DatePicker, Text } from "native-base";

// class MessagePreferences extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: null,
//       location: null,
//       chosenDate: new Date()
//     };
//     this.setDate = this.setDate.bind(this);
//   }

//   onSubmitTime() {}

//   onSubmitLocation() {}

//   setDate(newDate) {
//     this.setState({ chosenDate: newDate });
//   }

//   render() {
//     return (
//       <Container>
//         <Header />
//         <Content>
//           <DatePicker
//             defaultDate={new Date(2018, 4, 4)}
//             minimumDate={new Date(2018, 1, 1)}
//             maximumDate={new Date(2018, 12, 31)}
//             locale={"en"}
//             timeZoneOffsetInMinutes={undefined}
//             modalTransparent={false}
//             animationType={"fade"}
//             androidMode={"default"}
//             placeHolderText="Select date"
//             textStyle={{ color: "green" }}
//             placeHolderTextStyle={{ color: "#d3d3d3" }}
//             onDateChange={this.setDate}
//           />
//           <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text>
//         </Content>
//       </Container>
//     );
//   }
// }

// export default MessagePreferences;

import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: '',
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this._hideDateTimePicker();
  };

  render() {
    const { isDateTimePickerVisible, selectedDate } = this.state;
    return (
      <View>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          primary
          onPress={this._showDateTimePicker}
        >
          <View>
            <Text style={{ color: 'white' }}>Pick a Date</Text>
          </View>
        </Button>

        <Text>{selectedDate}</Text>

        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}
