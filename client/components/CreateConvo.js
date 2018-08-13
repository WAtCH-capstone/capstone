import React, { Component } from 'react';
import { Container, Form, Input, Item, Button, Label, Text } from 'native-base';

export default class CreateConvo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const navigation = this.props.navigation;
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Recipient E-mail</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.loginUser(this.state.email, this.state.password);
            }}
          >
            <Text style={{ color: 'white' }}>Create Conversation</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
