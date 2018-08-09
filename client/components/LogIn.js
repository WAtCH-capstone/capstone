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
              onChangeText={email =>
                this.setState({ email }, () => {
                  console.log("mail", email);
                })
              }
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
              this.handleSubmit();
            }}
          >
            <Label>Sign up</Label>
          </Button>
        </Form>
      </Container>
    );
  }
}
// this can be deleted

// import React from "react";
// import { Text, View } from "react-native";

// const LogIn = ({ navigation }) => (
//   <View>
//     <Text>Login goes here</Text>
//   </View>
// );

export default LogIn;
