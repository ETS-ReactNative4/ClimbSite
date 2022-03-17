import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput } from "react-native";

function LoginInput() {
  return (
    <View style={styles.inputlogin}>
      <Text style={styles.headerlogin}>Login </Text>
      <Text style={styles.inputtext}>Enter email: </Text>
      <TextInput style={styles.input} placeholder="Email..." />
      <Text style={styles.inputtext}>Enter password: </Text>
      <TextInput style={styles.input} placeholder="Password..." />
    </View>
  );
}

export default LoginInput;
