import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button } from "react-native";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.climbsite}>
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
      <View style={styles.inputLogin}>
        <Text style={styles.headerinput}>Login </Text>
        <Text style={styles.inputtext}>Enter your email: </Text>
        <TextInput style={styles.input} placeholder="Email..." />
        <Text style={styles.inputtext}>Enter your password: </Text>
        <TextInput style={styles.input} placeholder="Password..." />
        <Button title="Login" />
      </View>
      <Button title="Sign up" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}
