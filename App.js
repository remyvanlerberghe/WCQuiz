import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Home from "./src/Home";
import WorldCup from "./src/WorldCup";
import { createStackNavigator, createAppContainer } from "react-navigation";
const client = new ApolloClient({
  uri: "https://worldcup-2018.now.sh"
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Nav />
      </ApolloProvider>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home,
    WorldCup
  },
  {
    initialRouteName: "Home"
  }
);
const Nav = createAppContainer(AppNavigator);
