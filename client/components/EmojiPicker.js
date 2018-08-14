import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Content, Card, CardItem } from 'native-base';
import { Avatar } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import db from '../../firestore';
import firebase from 'firebase';

const emojis = [
  {
    id: 1,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/files/Money_Face_Emoji.png?9898922749706957214',
  },
  {
    id: 2,
    uri:
      'http://cdn.shopify.com/s/files/1/1061/1924/products/Face_With_Rolling_Eyes_Emoji_grande.png?v=1481523400',
  },
  {
    id: 3,
    uri:
      'https://i.pinimg.com/originals/03/7e/79/037e79b2fb52127537be79110891ae3f.png',
  },
  {
    id: 4,
    uri:
      'https://cdn.macrumors.com/article-new/2017/11/crying-tears-of-joy-emoji-250x248.jpg?retina',
  },
  {
    id: 5,
    uri:
      'https://www.telegraph.co.uk/content/dam/technology/2017/11/01/emoji_update_2017_12_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=450',
  },
  {
    id: 6,
    uri:
      'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/unamused-face.png',
  },
  {
    id: 7,
    uri:
      'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/smiling-face-with-heart-eyes.png',
  },
  {
    id: 8,
    uri:
      'https://static.wixstatic.com/media/9f2b78_4fcc7a4e5b3245439e25e7fccd4a794e~mv2.png',
  },
  {
    id: 9,
    uri:
      'https://static01.nyt.com/images/2017/07/13/business/13xp-emoji-vomit/13xp-emoji-vomit-jumbo.png?quality=90&auto=webp',
  },
  {
    id: 10,
    uri: 'http://meredith.images.worldnow.com/images/15106083_G.png',
  },
  {
    id: 11,
    uri: 'https://nyoobserver.files.wordpress.com/2014/11/sleep.png',
  },
  {
    id: 12,
    uri:
      'https://clipart.info/images/ccovers/1496184260OMG-Emoji-Png-transparent-background.png',
  },
  {
    id: 13,
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-gsooMN1ryGlQaoHy40OsNnHHzGz7-FernRDUEgfY6SeTlREfA',
  },
  {
    id: 14,
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-gsooMN1ryGlQaoHy40OsNnHHzGz7-FernRDUEgfY6SeTlREfA',
  },
  {
    id: 15,
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-gsooMN1ryGlQaoHy40OsNnHHzGz7-FernRDUEgfY6SeTlREfA',
  },
  {
    id: 16,
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-gsooMN1ryGlQaoHy40OsNnHHzGz7-FernRDUEgfY6SeTlREfA',
  },
  {
    id: 17,
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-gsooMN1ryGlQaoHy40OsNnHHzGz7-FernRDUEgfY6SeTlREfA',
  },
  {
    id: 18,
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-gsooMN1ryGlQaoHy40OsNnHHzGz7-FernRDUEgfY6SeTlREfA',
  },
  {
    id: 19,
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-gsooMN1ryGlQaoHy40OsNnHHzGz7-FernRDUEgfY6SeTlREfA',
  },
  {
    id: 20,
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-gsooMN1ryGlQaoHy40OsNnHHzGz7-FernRDUEgfY6SeTlREfA',
  },
];

export default class EmojiPicker extends Component {
  constructor() {
    super();
    this.state = { uri: '' };
    this.selectEmoji = this.selectEmoji.bind(this);
  }

  selectEmoji(uri) {
    this.setState({ uri });
    console.log('uri', this.state.uri);
  }

  renderEmoji(num) {
    const emoji = emojis[num];
    return (
      <View key={emoji.id}>
        <Avatar
          large
          rounded
          source={{
            uri: emoji.uri,
          }}
          onPress={() => this.selectEmoji(emoji.uri)}
          activeOpacity={0.7}
        />
      </View>
    );
  }

  render() {
    return (
      <Grid>
        <Col size={25}>
          <Row size={20}>{this.renderEmoji(0)}</Row>
          <Row size={20}>{this.renderEmoji(1)}</Row>
          <Row size={20}>{this.renderEmoji(2)}</Row>
          <Row size={20}>{this.renderEmoji(3)}</Row>
          <Row size={20}>{this.renderEmoji(4)}</Row>
        </Col>
        <Col size={25}>
          <Row size={20}>{this.renderEmoji(5)}</Row>
          <Row size={20}>{this.renderEmoji(6)}</Row>
          <Row size={20}>{this.renderEmoji(7)}</Row>
          <Row size={20}>{this.renderEmoji(8)}</Row>
          <Row size={20}>{this.renderEmoji(9)}</Row>
        </Col>
        <Col size={25}>
          <Row size={20}>{this.renderEmoji(10)}</Row>
          <Row size={20}>{this.renderEmoji(11)}</Row>
          <Row size={20}>{this.renderEmoji(12)}</Row>
          <Row size={20}>{this.renderEmoji(13)}</Row>
          <Row size={20}>{this.renderEmoji(14)}</Row>
        </Col>
        <Col size={25}>
          <Row size={20}>{this.renderEmoji(15)}</Row>
          <Row size={20}>{this.renderEmoji(16)}</Row>
          <Row size={20}>{this.renderEmoji(17)}</Row>
          <Row size={20}>{this.renderEmoji(18)}</Row>
          <Row size={20}>{this.renderEmoji(19)}</Row>
        </Col>
      </Grid>
    );
  }
}
