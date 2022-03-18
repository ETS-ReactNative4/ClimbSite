import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";

import { Text, View, TextInput, Button } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

export default function Register() {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={[styles.signupHeader, { height: height * 0.1 }]}>
        <Text style={{ color: "#1B8B6A" }}>Create</Text> Account
      </Text>
      <View style={styles.inputRegister}>
        <Text style={styles.headerinput}>Sign Up </Text>
        <Text style={styles.inputtext}>Enter your email: </Text>
        <TextInput style={styles.input} placeholder="Email..." />
        <Text style={styles.inputtext}>Enter your full name: </Text>
        <TextInput style={styles.input} placeholder="Full Name..." />
        <Text style={styles.inputtext}>Enter your password: </Text>
        <TextInput style={styles.input} placeholder="Password..." />
        <Text style={styles.inputtext}>Confirm your password: </Text>
        <TextInput style={styles.input} placeholder="Confirm password..." />
        <Button title="Register" />
      </View>
    </View>
  );
}
