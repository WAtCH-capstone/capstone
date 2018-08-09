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

const Convos = ({ navigation }) => {
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
};

export default Convos;
