// this can be deleted
import React from "react";
import { Container, Form, Item, Label, Input, Button } from "native-base";
import { Text } from "react-native";

class SignUp extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Container>
        <Form>
          <Item>
            <Label>Display Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
            />
          </Item>
          <Item>
            <Label>Username</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
            />
          </Item>
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
          <Item>
            <Label>Confirm Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              secureTextEntry={true}
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
export default SignUp;

// import React from "react";
// import { Text, View } from "react-native";

// const SignUp = ({ navigation }) => (
//   <View>
//     <Text>SignUp goes here</Text>
//   </View>
// );
