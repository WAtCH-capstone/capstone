import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import db from '../../firestore';
import firebase from 'firebase';

const emojis = [
  {
    id: 0,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/files/Money_Face_Emoji.png?9898922749706957214',
  },
  {
    id: 1,
    uri: 'https://data.whicdn.com/images/298328448/large.jpg',
  },
  {
    id: 2,
    uri:
      'https://i.pinimg.com/originals/03/7e/79/037e79b2fb52127537be79110891ae3f.png',
  },
  {
    id: 3,
    uri:
      'https://cdn.macrumors.com/article-new/2017/11/crying-tears-of-joy-emoji-250x248.jpg?retina',
  },
  {
    id: 4,
    uri:
      'https://www.telegraph.co.uk/content/dam/technology/2017/11/01/monocle_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png',
  },
  {
    id: 5,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/products/Angel_Halo_Emoji_Icon_0ff75c27-5416-4ac6-bf1a-2a2d44b0a32b_large.png?v=1513251030',
  },
  {
    id: 6,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/files/Nerd_with_Glasses_Emoji.png?9898922749706957214',
  },
  {
    id: 7,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/files/Zipper-Mouth_Face_Emoji.png?9898922749706957214',
  },
  {
    id: 8,
    uri:
      'https://static01.nyt.com/images/2017/07/13/business/13xp-emoji-vomit/13xp-emoji-vomit-jumbo.png?quality=90&auto=webp',
  },
  {
    id: 9,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/files/Surprised_Face_Emoji.png?9898922749706957214',
  },
  {
    id: 10,
    uri: 'https://nyoobserver.files.wordpress.com/2014/11/sleep.png',
  },
  {
    id: 11,
    uri:
      'https://clipart.info/images/ccovers/1496184260OMG-Emoji-Png-transparent-background.png',
  },
  {
    id: 12,
    uri:
      'https://rlv.zcache.com/smiling_cat_face_with_open_mouth_emoji_classic_round_sticker-r43081d1281ca42e4913095a507edabcc_v9waf_8byvr_307.jpg?rvtype=content',
  },
  {
    id: 13,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/products/Dog_Emoji_large.png?v=1480481035',
  },
  {
    id: 14,
    uri:
      'https://o.aolcdn.com/images/dims?quality=80&thumbnail=200%2C150&image_uri=http%3A%2F%2Fi.huffpost.com%2Fgen%2F2714370%2Fimages%2Fn-POOP-EMOJI-ICE-CREAM-628x314.jpg&client=cbc79c14efcebee57402&signature=4d62078ba97fef98f4040c7f89cdc2ab9d9419cb',
  },
  {
    id: 15,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1513251060',
  },
  {
    id: 16,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/products/Super_Angry_Face_Emoji_ios10_large.png?v=1513249402',
  },
  {
    id: 17,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/products/OMG_Face_Emoji_large.png?v=1480481054',
  },
  {
    id: 18,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/products/See_No_Evil_Monkey_Emoji_large.png?v=1480481037',
  },
  {
    id: 19,
    uri:
      'https://cdn.shopify.com/s/files/1/1061/1924/files/Octopus_Emoji.png?9898922749706957214',
  },
];

export default class EmojiPicker extends Component {
  constructor() {
    super();
    this.selectEmoji = this.selectEmoji.bind(this);
  }

  async selectEmoji(uri) {
    const currUserId = await firebase.auth().currentUser.uid;
    const currUserRef = db.collection('users').doc(currUserId);
    currUserRef.update({ icon: uri });
    alert(`Your account was created! Now you may login.`);
    this.props.navigation.navigate('LogIn');
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
