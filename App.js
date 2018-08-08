import React from "react";
import { createStackNavigator } from "react-navigation";
import { Home } from "./components";

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: "Home"
    }
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
