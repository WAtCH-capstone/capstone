import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Container,
  Content,
  Picker,
} from 'native-base';
import languages from './Languages';

export default class TranslateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      messageContent: '',
      selected1: 'key',
    };
  }

  async onValueChange(value) {
    await this.setState({
      selected1: value,
    });
    this.props.translateMessage(
      this.props.messageContent,
      this.state.selected1
    );
  }

  render() {
    return (
      <View style={styles.scheduleButton}>
        <Button style={styles.blueButton} full rounded primary>
          <Content>
            <Picker
              style={{ alignItems: 'center' }}
              mode="dropdown"
              selectedValue={this.state.selected1}
              placeholder="Translate"
              onValueChange={this.onValueChange.bind(this)}
            >
              {languages.map(value => (
                <Picker.Item key={value[1]} label={value[1]} value={value[0]} />
              ))}
            </Picker>
          </Content>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blueButton: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  scheduleButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
});
