import React from "react";
import { Image } from "react-native";
import { Container, Form, Input, Item, Button, Label, Text } from "native-base";
const firebase = require("firebase");

// const convos = [
//   {
//     id: 1,
//     name: 'Mom',
//     messages: [{ id: 1, time: '3:30pm', text: 'Hello World' }],
//   },
//   {
//     id: 2,
//     name: 'Jack',
//     messages: [{ id: 1, time: '11:17am', text: 'Dlrow Olleh' }],
//   },
// ];
console.error = error => error.apply;
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", emailError: "", passwordError: "" };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate("Convos"));
    } catch (err) {
      // console.log(err.toString());
      // console.log(err);
      // var errorCode = err.code;
      // var errorMessage = err.message;
      this.setState({ error: "Authentication Failed", loading: false });
    }
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <Button
        style={{ marginTop: 10 }}
        full
        rounded
        primary
        onPress={() => {
          this.loginUser(this.state.email, this.state.password);
          this.setState({ error: "", loading: true });
        }}
      >
        <Text style={{ color: "white" }}>Log in</Text>
      </Button>
    );
  }
  // renderButtonOrLoading() {
  //   if (this.state.loading) {
  //     return <Text>Loading...</Text>;
  //   }
  //   return (
  //     <Button
  //       style={{ marginTop: 10 }}
  //       full
  //       rounded
  //       primary
  //       onPress={() => {
  //         this.loginUser(this.state.email, this.state.password);
  //         this.setState({ error: "", loading: true });
  //       }}
  //     >
  //       <Text style={{ color: "white" }}>Log in</Text>
  //     </Button>
  //   );
  // }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={{ paddingBottom: 100 }}>
        <Image
          source={{
            uri:
              "https://lh3.googleusercontent.com/vgv0EDmcYrsy-o7ZjRzKPbJzW2fC7uqSKsnMhrGcTaMImLIKM-1ePl0Gy-n-8SFmCYJKWUf-wu4ChBkJAQ"
          }}
          style={{
            width: "100%",
            height: "60%",
            justifyContent: "center",
            alignItems: "center"
          }}
        />
        <Form>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="always"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Text>{this.state.error}</Text>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.loginUser(this.state.email, this.state.password);
              this.setState({ error: "", loading: true });
            }}
          >
            <Text style={{ color: "white" }}>Log in</Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Button>

          <Button
            onPress={() => this.props.navigation.navigate("SignUp")}
            title="Sign up"
          />
        </Form>
      </Container>
    );
  }
}

export default LogIn;
