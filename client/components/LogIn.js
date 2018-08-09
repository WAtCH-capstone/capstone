import React from "react";
import { StyleSheet, View, Image } from "react-native";
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
            />
          </Item>
          <Item>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              secureTextEntry={true}
            />
          </Item>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="always"
          />
          <Button>
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
