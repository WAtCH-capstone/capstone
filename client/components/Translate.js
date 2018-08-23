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
        <Button style={styles.blueButton} full rounded success>
          <Content>
            <Picker
              style={styles.picker}
              mode="dropdown"
              selectedValue={this.state.selected1}
              placeholder="Translate"
              onValueChange={this.onValueChange.bind(this)}
              textStyle={{ color: 'white' }}
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
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  scheduleButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  picker: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: -40,
    paddingBottom: 10,
  },
});

console.disableYellowBox = true;
