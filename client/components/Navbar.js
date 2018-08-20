import React, { Component } from 'react';
import { Image } from 'react-native';
import { Footer, FooterTab, Button, View } from 'native-base';
import styles from './Styles';

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
                source={require('../../public/navbar/message.png')}
                style={{ width: 50, height: 50 }}
              />
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('ScheduledMessages');
              }}
            >
              <Image
                source={require('../../public/navbar/clock.png')}
                style={{ width: 50, height: 50 }}
              />
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('Settings');
              }}
            >
              <Image
                source={require('../../public/navbar/gear.png')}
                style={{ width: 50, height: 50 }}
              />
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

//OLD SETTINGS ICON:
//'https://cdn0.iconfinder.com/data/icons/thin-essentials/57/thin-053_settings_gear_preferences-512.png'
