import { Text, View } from "react-native";
import Login from "./pages/Login";
import React from "react";
import { styles } from "./styles";

export default function App() {
  return (
    <View style={styles.app}>
      <Login />
    </View>
  );
}
