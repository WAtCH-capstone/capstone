import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";

import styles from "./Styles";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Container>
        <Image
          source={{
            uri:
              "https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ"
          }}
          style={{ height: 100, width: null, flex: 1 }}
        />
        <Form>
          <Item>
            <Label>E-mail</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="always"
          />
          <Button
            onPress={() => {
              this.handleSubmit(this.state.email, this.state.password);
            }}
          >
            <Label>Sign up</Label>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LogIn;
