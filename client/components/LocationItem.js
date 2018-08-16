import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default class LocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationDetails: ""
    };
  }

  _handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id);
    this.setState({ locationDetails: res });
    console.log(this.state.locationDetails);
  };
  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={this._handlePress}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center"
  }
});
