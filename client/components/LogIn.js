import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";

import styles from "./Styles";

class Login extends React.Component {
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

// import React from "react";
// import { Text, View } from "react-native";

// const LogIn = ({ navigation }) => (
//   <View>
//     <Text>Login goes here</Text>
//   </View>
// );

// export default LogIn;
