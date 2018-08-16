import React, { Component } from 'react';
import { Image } from 'react-native';
import { Footer, FooterTab, Button, View } from 'native-base';
import styles from './styles';

export default class Navbar extends Component {
  constructor() {
    super();
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <Footer style={styles.navbar}>
          <FooterTab>
            <Button
              onPress={() => {
                navigation.navigate('Convos');
              }}
            >
              <Image
                source={{
                  uri:
                    'https://cdn.icon-icons.com/icons2/935/PNG/512/speech-bubble-oval-symbol-with-three-dots_icon-icons.com_73151.png',
                }}
                style={{ width: 50, height: 50 }}
              />
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('LogIn');
              }}
            >
              <Image
                source={{
                  uri: 'https://static.thenounproject.com/png/538846-200.png',
                }}
                style={{ width: 50, height: 50 }}
              />
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('Settings');
              }}
            >
              <Image
                source={{
                  uri:
                    'https://cdn0.iconfinder.com/data/icons/thin-essentials/57/thin-053_settings_gear_preferences-512.png',
                }}
                style={{ width: 50, height: 50 }}
              />
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}
