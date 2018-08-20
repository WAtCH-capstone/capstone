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
  Picker,
  Container,
  Content,
} from 'native-base';
import key from '../../googleMaps';
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from 'react-native-power-translator';

TranslatorConfiguration.setConfig(ProviderTypes.Google, key, 'fr');
const translator = TranslatorFactory.createTranslator();

export default class TranslateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItem: undefined,
      selected1: 'key',
      results: {
        items: [],
      },
    };
    this.translateMessage = this.translateMessage.bind(this);
  }

  onValueChange(value) {
    this.setState({
      selected1: value,
    });
  }

  translateMessage(messageContent) {
    translator
      .translate('Engineering physics or engineering science')
      .then(translated => {
        console.log(translated);
      });
  }

  render() {
    return (
      // <View style={styles.scheduleButton}>
      //   <Button
      // style={styles.blueButton}
      // full
      // rounded
      // primary
      //     // onPress={() => this.translateMessage(this.props.messageContent)}
      //   >
      //     <View>
      //       <Text style={{ color: 'white' }}>Translate this Message</Text>
      //     </View>
      //   </Button>
      // </View>

      <View style={styles.scheduleButton}>
        <Button
          style={styles.blueButton}
          full
          rounded
          primary
          onPress={() => this.translateMessage()}
        >
          {/* <Content>
            <Picker
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Select a Language " value="key" />
              <Picker.Item label="Cats" value="key0" />
              <Picker.Item label="Dogs" value="key1" />
              <Picker.Item label="Birds" value="key2" />
              <Picker.Item label="Elephants" value="key3" />
            </Picker>
          </Content> */}
          <Text>Translate</Text>
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
