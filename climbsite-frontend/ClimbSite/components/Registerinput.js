import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput } from "react-native";

function LoginInput() {
  return (
    <View style={styles.inputblock}>
      <Text style={styles.headerinput}>Sign Up </Text>
      <Text style={styles.inputtext}>Enter your email: </Text>
      <TextInput style={styles.input} placeholder="Email..." />
      <Text style={styles.inputtext}>Enter your full name: </Text>
      <TextInput style={styles.input} placeholder="Email..." />
      <Text style={styles.inputtext}>Enter your password: </Text>
      <TextInput style={styles.input} placeholder="Password..." />
      <Text style={styles.inputtext}>Confirm your password: </Text>
      <TextInput style={styles.input} placeholder="Confirm password..." />
    </View>
  );
}

export default LoginInput;
