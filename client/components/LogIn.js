import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";

import styles from "./Styles";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Form>
          <Item>
            <Label>E-mail</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
            />
          </Item>
          <Button>
            <Text>Login</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
// this can be deleted

export default LogIn;
