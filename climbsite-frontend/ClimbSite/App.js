import { Text, View } from "react-native";
import Login from "./pages/Login";
import React from "react";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer style={styles.app}>
      <Login />
    </NavigationContainer>
  );
}
