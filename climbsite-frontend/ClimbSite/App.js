import { Text, View } from "react-native";
import Login from "./pages/Login";
import React from "react";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import LogClimb from "./pages/LogClimb";
import LogEvent from "./pages/LogEvent";
import SearchEvent from "./pages/SearchEvent";
import Profile from "./pages/Profile";
import Header from "./components/Header";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.app}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Navbar" component={Navbar} />
        <Stack.Screen name="LogClimb" component={LogClimb} />
        <Stack.Screen name="LogEvent" component={LogEvent} />
        <Stack.Screen name="SearchEvent" component={SearchEvent} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
