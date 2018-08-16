import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import key from "../../googleMaps";
import LocationItem from "./LocationItem";

export default class MessagePreferences extends Component {
  constructor() {
    super();
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: ""
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
      <View style={{ backgroundColor: "white", marginBottom: 200 }}>
        <View>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={this._showDateTimePicker}
          >
            <View>
              <Text style={{ color: "white" }}>Pick a Date</Text>
            </View>
          </Button>
          <Text>{selectedDate}</Text>
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
        <View style={styles.container}>
          <GoogleAutoComplete apiKey={key} debounce={500} minLength={3}>
            {({ handleTextChange, locationResults, fetchDetails }) => (
              <React.Fragment>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.mapTextInput}
                    placeholder="Search"
                    onChangeText={handleTextChange}
                  />
                </View>
                <ScrollView>
                  {locationResults.map(el => (
                    <LocationItem
                      {...el}
                      key={el.id}
                      fetchDetails={fetchDetails}
                    />
                  ))}
                </ScrollView>
              </React.Fragment>
            )}
          </GoogleAutoComplete>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 80
  },
  mapTextInput: {
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingHorizontal: 16
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
