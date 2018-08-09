import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import db from '../../firestore';
import firebase from 'firebase';

export default class Convos extends React.Component {
  constructor() {
    super();
    this.state = {
      convos: [],
    };
  }

  // const loggedInUser = db.collections('users').doc(userId).get()
  // loggedInUser.data().conversations (array of IDs)
  // arr.forEach(convo => db.collections('conversations').doc(convo).get())

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    const userData = snapshot.docs.map(doc => doc.data());

    let convos = [];

    await userData[0].conversations.forEach(async id => {
      const convo = await db
        .collection('conversations')
        .doc(id)
        .get();
      convos.push(convo.data());
    });
    console.log(convos);

    this.setState({ convos: convos });
  }

  render() {
    const navigation = this.props.navigation;
    const convo = this.state.convos['0'];
    console.log('rendering:', convo);
    if (convo) {
      const firstMessage = convo.messages[0];
      return (
        <Container>
          <Content>
            <List>
              <ListItem
                key={1}
                avatar
                onPress={() => navigation.navigate('SingleConvo', { convo })}
              >
                <Left>
                  <Thumbnail
                    source={{ uri: 'https://placeimg.com/140/140/any' }}
                  />
                </Left>
                <Body>
                  <Text>{convo.users[0]}</Text>
                  <Text note>{firstMessage.text}.</Text>
                </Body>
                <Right>
                  <Text note>{firstMessage.time}</Text>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Text>No conversations</Text>
        </Container>
      );
    }
  }
}
