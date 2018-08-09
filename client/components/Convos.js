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

export default class Convos extends React.Component {
  constructor() {
    super();
    this.state = { convos: null };
  }

  componentDidMount() {
    db.collection('conversations')
      .doc('ZtaxF3W255TD6CdjB144')
      .get()
      .then(snapshot => this.setState({ convos: snapshot.data() }));
  }

  render() {
    console.log(this.state.convos);
    const navigation = this.props.navigation;
    if (this.state.convos) {
      const convos = this.state.convos;
      const firstMessage = convos.messages[0];
      return (
        <Container>
          <Content>
            <List>
              <ListItem
                key={1}
                avatar
                onPress={() => navigation.navigate('SingleConvo', { convos })}
              >
                <Left>
                  <Thumbnail
                    source={{ uri: 'https://placeimg.com/140/140/any' }}
                  />
                </Left>
                <Body>
                  <Text>{convos.users[0].name}</Text>
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
          <Text>Getting data...</Text>
        </Container>
      );
    }
  }
}
