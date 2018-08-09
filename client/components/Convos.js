import React, { Component } from 'react';
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
  Header,
  Item,
  Input,
  Button,
} from 'native-base';

class Convos extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  enterSearch(search) {
    console.log('search: ', search);
    console.log(
      'this would filter the messages and only return ones relevant to the search'
    );
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Input
              clearButtonMode="always"
              onChangeText={search => this.setState({ search })}
              placeholder="Search"
            />
          </Item>
          <Button
            transparent
            onPress={() => this.enterSearch(this.state.search)}
          >
            <Text>Search</Text>
          </Button>
        </Header>
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

export default Convos;
