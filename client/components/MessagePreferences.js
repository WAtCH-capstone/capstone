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
import LocationItem from './LocationItem';
const UserContext = React.createContext()

export default class MessagePreferences extends Component {
  constructor() {
    super();
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: '',
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _showMapLookup = () => this.setState({ isMapLookupVisible: true });

  _hideMapLookup = () => this.setState({ isMapLookupVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this._hideDateTimePicker();
  };

  _handlePress = async () => {
    const res = await fetchDetails(el.place_id);
    console.log(res);
    this.setState({ locationDetails: res });
    console.log(this.state.locationDetails);
  };

  // _handleMapPress = () => {
  //   return (
  //     <GoogleAutoComplete apiKey={key} debounce={500} minLength={3}>
  //       {({ handleTextChange, locationResults, fetchDetails, isSearching }) => (
  //         <React.Fragment>
  //           <View style={styles.inputWrapper}>
  //             <TextInput
  //               style={styles.mapTextInput}
  //               placeholder="Search"
  //               onChangeText={handleTextChange}
  //             />
  //           </View>
  //           {isSearching && <ActivityIndicator />}
  //           <ScrollView>
  //             {/* {fetchDetails} = {fetchDetails} */}
  //             {locationResults.map(el => (
  //               <LocationItem {...el} key={el.id} fetchDetails={fetchDetails} />

  //               // <TouchableOpacity
  //               //   key={el.id}
  //               //   style={styles.root}
  //               //   // fetchDetails={fetchDetails}
  //               //   onPress={this._handlePress}
  //               // >
  //               //   <Text>{el.description}</Text>
  //               // </TouchableOpacity>
  //             ))}
  //           </ScrollView>
  //         </React.Fragment>
  //       )}
  //     </GoogleAutoComplete>
  //   );
  // };
  render() {
    const { isDateTimePickerVisible, selectedDate } = this.state;
    return (
      <View style={{ backgroundColor: 'white', paddingBottom: 30 }}>
        <View>
          <Button
            style={styles.blueButton}
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
        <View style={styles.container}>
          {/* <Button
            style={styles.blueButton}
            full
            rounded
            primary
            onPress={this._handleMapPress}
          >
            <View>
              <Text style={{ color: 'white' }}>Pick a Location</Text>
            </View>
          </Button> */}
          <GoogleAutoComplete apiKey={key} debounce={500} minLength={3}>
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
                    placeholder="Search"
                    onChangeText={handleTextChange}
                  />
                </View>
                {isSearching && <ActivityIndicator />}
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
    paddingTop: -50
  },

});
