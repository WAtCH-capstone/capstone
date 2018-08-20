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
import key from '../../googleMaps';
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from 'react-native-power-translator';
import languages from './Languages';

export default class TranslateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItem: undefined,
      selected1: 'key',
      language: '',
      results: {
        items: [],
      },
    };
    this.translateMessage = this.translateMessage.bind(this);
    // this.onValueChange = this.onValueChange.bind(this);
  }

  // onValueChange(value) {
  //   this.setState({
  //     selected1: value,
  //   });
  //   // this.translateMessage(this.state.messageContent, 'fr');
  // }

  translateMessage(messageContent, lang) {
    // TranslatorConfiguration.setConfig(ProviderTypes.Google, key, 'fr');
    // const translator = TranslatorFactory.createTranslator();
    // translator
    //   .translate('Engineering physics or engineering science')
    //   .then(translated => {
    //     console.log(translated);
    //   });

    TranslatorConfiguration.setConfig(ProviderTypes.Google, key, lang);
    const translator = TranslatorFactory.createTranslator();
    translator.translate(messageContent).then(translated => {
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
          // onPress={() => this.translateMessage()}
        >
          <Content>
            <Picker
              mode="dropdown"
              selectedValue={this.state.en}
              placeholder="Translate"
              onValueChange={(itemValue, itemIndex) => (
                this.setState({
                  language: itemValue,
                  selected1: this.state.itemValue,
                }),
                this.translateMessage(
                  this.state.messageContent,
                  itemValue //may need to change
                )
              )}
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
