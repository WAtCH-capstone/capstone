// this can be deleted
import React from "react";
import { Container, Form, Item, Label, Input, Button } from "native-base";
import { Text } from "react-native";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const displayName = this.state.displayName;
    const userName = this.state.userName;
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
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
              onChangeText={displayName => this.setState({ displayName })}
            />
          </Item>
          <Item>
            <Label>Username</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={userName => this.setState({ userName })}
            />
          </Item>
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
          <Item>
            <Label>Confirm Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              secureTextEntry={true}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
            />
          </Item>
          <Button
            onPress={() => {
              this.handleSubmit();
            }}
          >
            <Text>Login</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
export default SignUp;

console.disableYellowBox = true;

// import React from "react";
// import { Text, View } from "react-native";

// const SignUp = ({ navigation }) => (
//   <View>
//     <Text>SignUp goes here</Text>
//   </View>
// );
