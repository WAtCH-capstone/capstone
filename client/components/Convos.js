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
    this.state = {};
  }

  componentDidMount() {
    const convo = db.collection('conversations').doc('ZtaxF3W255TD6CdjB144');
    // const convo = db.ref('conversations/ZtaxF3W255TD6CdjB144');
    console.log(convo);
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Content>
          <List>
            {navigation.state.params.convos.map(convo => {
              const firstMessage = convo.messages[0];
              return (
                <ListItem
                  avatar
                  key={convo.id}
                  onPress={() => navigation.navigate('SingleConvo', { convo })}
                >
                  <Left>
                    <Thumbnail
                      source={{ uri: 'https://placeimg.com/140/140/any' }}
                    />
                  </Left>
                  <Body>
                    <Text>{convo.name}</Text>
                    <Text note>{firstMessage.text}.</Text>
                  </Body>
                  <Right>
                    <Text note>{firstMessage.time}</Text>
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}
