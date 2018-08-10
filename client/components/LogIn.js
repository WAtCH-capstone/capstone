import React from "react";
import { Image } from "react-native";
import { Container, Form, Input, Item, Button, Label, Text } from "native-base";
const firebase = require("firebase");

const convos = [
  {
    id: 1,
    name: "Mom",
    messages: [{ id: 1, time: "3:30pm", text: "Hello World" }]
  },
  {
    id: 2,
    name: "Jack",
    messages: [{ id: 1, time: "11:17am", text: "Dlrow Olleh" }]
  }
];

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => console.log(user))
        .then(() =>
          this.props.navigation.navigate("Convos", { convos: convos })
        );
    } catch (err) {
      console.log(err.toString());
    }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
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
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.loginUser(this.state.email, this.state.password);
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

          {/* <Button
            onPress={() => this.props.navigation.navigate("SignUp")}
            title="Sign up"
          /> */}
        </Form>
      </Container>
    );
  }
}

export default LogIn;
